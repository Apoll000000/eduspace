import React, { useState,useEffect } from "react";
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://bwkkphvzmigjrnyptzhv.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3a2twaHZ6bWlnanJueXB0emh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE2NTQ1MjYsImV4cCI6MjA0NzIzMDUyNn0.VObIEpLVaxmi6wW8fL3TCMTzfLswcB6cawsFbVgcXmQ"; // Replace with your Supabase anon key

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function PostModal({ token }) {
    const [activeTab, setActiveTab] = useState("poll");
    const [attachments, setAttachments] = useState([]);
    const [pollOptions, setPollOptions] = useState(["", ""]);
    const [postDescription, setpostDescription] = useState("");
    const [surveyQuestions, setSurveyQuestions] = useState([{ type: "yesNo", text: "", equivalents: [] }]);

    const handleFileChange = (index, file) => {
        setAttachments((prev) =>
            prev.map((attachment, i) => (i === index ? file : attachment))
        );
    };

    const addAttachment = () => setAttachments([...attachments, ""]);
    const removeAttachment = (index) => setAttachments(attachments.filter((_, i) => i !== index));

    const addPollOption = () => setPollOptions([...pollOptions, ""]);
    const removePollOption = (index) => setPollOptions(pollOptions.filter((_, i) => i !== index));
    const handlePollOptionChange = (index, value) => setPollOptions(pollOptions.map((option, i) => (i === index ? value : option)));

    const addSurveyQuestion = () => setSurveyQuestions([...surveyQuestions, { type: "yesNo", text: "", equivalents: [] }]);
    const removeSurveyQuestion = (index) => setSurveyQuestions(surveyQuestions.filter((_, i) => i !== index));
    const handleSurveyChange = (index, key, value) => setSurveyQuestions(surveyQuestions.map((q, i) => (i === index ? { ...q, [key]: value } : q)));
    const addEquivalent = (index) => handleSurveyChange(index, "equivalents", [...(surveyQuestions[index].equivalents || []), ""]);
    const removeEquivalent = (questionIndex, equivalentIndex) => handleSurveyChange(questionIndex, "equivalents", surveyQuestions[questionIndex].equivalents.filter((_, i) => i !== equivalentIndex));

    const [alertMessage, setAlertMessage] = useState(null); // State for alert messages
    const [alertType, setAlertType] = useState("alert-info");

    useEffect(() => {
        console.log("Alert type changed to:", alertType);
    }, [alertType]);


    const uploadAttachments = async () => {
        const uploadedFiles = [];
        for (const file of attachments) {
            const { data, error } = await supabase.storage
                .from("posts_attachments")
                .upload(`posts/${file.name}`, file);
            if (error) {
                console.error("Error uploading file:", error);
                setAlertType("alert-error");
                setAlertMessage("Error uploading file.");
                return [];
            }
            uploadedFiles.push(data.path);
        }
        return uploadedFiles;
    };

    const handlePostSubmit = async (e) => {
        e.preventDefault();

        const uploadedFiles = await uploadAttachments();

        // Construct the post data
        const postContent = activeTab === activeTab ? postDescription : "";
        const newPost = {
            user_id: token.user.id,
            post_channel: "general",
            post_category: activeTab,
            content: postContent,
            attachments: uploadedFiles,
            poll_options: activeTab === "poll" ? pollOptions : null,
            survey_questions: activeTab === "survey" ? surveyQuestions : null,
        };
        // Perform validation based on the active tab
        if (activeTab === "text") {
            if (!postContent.trim()) {
                setAlertType("alert-error");
                setAlertMessage("Text content cannot be empty.");
                return;
            }
        } else if (activeTab === "textAttachment") {
            if (attachments.some((attachment) => !attachment) || !uploadedFiles.length || !postContent.trim()) {
                setAlertType("alert-error");
                setAlertMessage("Text must be filled and all attachment fields must have valid files.");
                return;
            }
        } else if (activeTab === "poll") {
            if (pollOptions.some((option) => !option.trim()) || !postContent.trim()) {
                setAlertType("alert-error");
                setAlertMessage("Poll question & all options must be filled.");
                return;
            }
        } else if (activeTab === "survey") {
            if (surveyQuestions.some((q) => !q.text.trim()) || !postContent.trim()) {
                setAlertType("alert-error");
                setAlertMessage("Survey description & survey questions must have text.");
                return;
            }
            if (
                surveyQuestions.some(
                    (q) =>
                        q.type === "rating" &&
                        (q.equivalents || []).some((eq) => !eq.trim())
                )
            ) {
                setAlertType("alert-error");
                setAlertMessage("All equivalents in rating questions must be filled.");
                return;
            }
        }

        try {
            const { data, error } = await supabase.from("tbl_posts").insert([newPost]);
            if (error) {
                console.error("Error inserting post: ", error);
                setAlertType("alert-error");
                setAlertMessage("Error inserting post");
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } else {
                console.log("Post successfully created:", data);
                setAlertType("alert-success");
                setAlertMessage("Post successfully created");
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }
        } catch (error) {
            console.error("Error submitting post:", error);
            setAlertType("alert-error");
            setAlertMessage("Error submitting post");
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }
    };



    // Render Tab Content
    const renderContent = () => {
        switch (activeTab) {
            case "text":
                return (
                    <div>
                        <h2 className="text-lg font-bold">Text Post</h2>
                        <textarea
                            className="textarea textarea-bordered w-full"
                            placeholder="Write your text here..."
                            value={postDescription}
                            onChange={(e) =>
                                setpostDescription(
                                    e.target.value
                                )
                            }
                        ></textarea>
                    </div>
                );
            case "textAttachment":
                return (
                    <div>
                        <h2 className="text-lg font-bold">Text & Attachment</h2>
                        <textarea
                            className="textarea textarea-bordered w-full mb-4"
                            placeholder="Write your text here..."
                            value={postDescription}
                            onChange={(e) => setpostDescription(e.target.value)}
                        ></textarea>
                        <div className="space-y-2">
                            {attachments.map((attachment, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <input
                                        type="file"
                                        className="file-input file-input-bordered w-full"
                                        onChange={(e) => handleFileChange(index, e.target.files[0])}

                                    />
                                    <button
                                        type="button"
                                        className="btn btn-error btn-sm"
                                        onClick={() => removeAttachment(index)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            className="btn btn-secondary btn-sm mt-2"
                            onClick={addAttachment}
                        >
                            Add Attachment
                        </button>
                    </div>
                );

            case "poll":
                return (
                    <div>
                        <h2 className="text-lg font-bold">Create a Poll</h2>
                        <input
                            type="text"
                            className="input input-bordered w-full mb-4"
                            placeholder="Poll Question"
                            value={postDescription}
                            onChange={(e) =>
                                setpostDescription(
                                    e.target.value
                                )
                            }
                        />
                        {pollOptions.map((option, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 mb-2"
                            >
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    placeholder={`Option ${index + 1}`}
                                    value={option}
                                    onChange={(e) =>
                                        handlePollOptionChange(
                                            index,
                                            e.target.value
                                        )
                                    }
                                />
                                <button
                                    type="button"
                                    className="btn btn-error btn-sm"
                                    onClick={() => removePollOption(index)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={addPollOption}
                        >
                            Add Option
                        </button>
                    </div>
                );
            case "survey":
                return (
                    <div>
                        <h2 className="text-lg font-bold">Create a Survey</h2>
                        <textarea
                            className="textarea textarea-bordered w-full mb-4"
                            placeholder="Survey Description"
                            value={postDescription}
                            onChange={(e) =>
                                setpostDescription(
                                    e.target.value
                                )
                            }
                        ></textarea>
                        {surveyQuestions.map((question, index) => (
                            <div
                                key={index}
                                className="border rounded-lg p-4 mb-4"
                            >
                                <input
                                    type="text"
                                    className="input input-bordered w-full mb-2"
                                    placeholder={`Question ${index + 1}`}
                                    value={question.text}
                                    onChange={(e) =>
                                        handleSurveyChange(
                                            index,
                                            "text",
                                            e.target.value
                                        )
                                    }
                                />
                                <select
                                    className="select select-bordered w-full mb-2"
                                    value={question.type}
                                    onChange={(e) =>
                                        handleSurveyChange(
                                            index,
                                            "type",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="yesNo">Yes/No</option>
                                    <option value="rating">Rating (1-5)</option>
                                    <option value="openEnded">
                                        Open-Ended
                                    </option>
                                </select>
                                {question.type === "rating" && (
                                    <div className="space-y-2">
                                        {question.equivalents.map(
                                            (equivalent, eqIndex) => (
                                                <div
                                                    key={eqIndex}
                                                    className="flex gap-2"
                                                >
                                                    <input
                                                        type="text"
                                                        className="input input-bordered w-full"
                                                        placeholder={`Equivalent for ${eqIndex + 1}`}
                                                        value={equivalent}
                                                        onChange={(e) =>
                                                            handleSurveyChange(
                                                                index,
                                                                "equivalents",
                                                                question.equivalents.map(
                                                                    (
                                                                        eq,
                                                                        i
                                                                    ) =>
                                                                        i ===
                                                                            eqIndex
                                                                            ? e
                                                                                .target
                                                                                .value
                                                                            : eq
                                                                )
                                                            )
                                                        }
                                                    />
                                                    <button
                                                        type="button"
                                                        className="btn btn-error btn-sm"
                                                        onClick={() =>
                                                            removeEquivalent(
                                                                index,
                                                                eqIndex
                                                            )
                                                        }
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            )
                                        )}
                                        <button
                                            type="button"
                                            className="btn btn-secondary btn-sm"
                                            onClick={() => addEquivalent(index)}
                                        >
                                            Add Equivalent
                                        </button>
                                    </div>
                                )}
                                <button
                                    type="button"
                                    className="btn btn-error btn-sm mt-2"
                                    onClick={() =>
                                        removeSurveyQuestion(index)
                                    }
                                >
                                    Remove Question
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={addSurveyQuestion}
                        >
                            Add Question
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <dialog id="post_modal" className="modal">
                <div className="modal-box">
                    {alertMessage && (
                        <div role="alert" className={`alert ${alertType}`}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="h-6 w-6 shrink-0 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                            </svg>
                            <span>{alertMessage}</span>
                        </div>
                    )}

                    <form method="dialog" onSubmit={handlePostSubmit}>
                        <div role="tablist" className="tabs tabs-boxed">
                            <a
                                role="tab"
                                className={`tab ${activeTab === "text" ? "tab-active" : ""
                                    }`}
                                onClick={() => setActiveTab("text")}
                            >
                                Text
                            </a>
                            <a
                                role="tab"
                                className={`tab ${activeTab === "textAttachment"
                                    ? "tab-active"
                                    : ""
                                    }`}
                                onClick={() => setActiveTab("textAttachment")}
                            >
                                Text & Attachment
                            </a>
                            <a
                                role="tab"
                                className={`tab ${activeTab === "poll" ? "tab-active" : ""
                                    }`}
                                onClick={() => setActiveTab("poll")}
                            >
                                Poll
                            </a>
                            <a
                                role="tab"
                                className={`tab ${activeTab === "survey"
                                    ? "tab-active"
                                    : ""
                                    }`}
                                onClick={() => setActiveTab("survey")}
                            >
                                Survey
                            </a>
                        </div>

                        <div className="mt-4">{renderContent()}</div>

                        <div className="flex justify-end mt-2 w-full gap-2">
                            <button className="btn btn-neutral" onClick={() => document.getElementById("post_modal").close()}>Cancel</button>
                            <button className="btn btn-primary" type="submit">Confirm Post</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    );
}

export default PostModal;
