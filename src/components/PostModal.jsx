import React, { useState } from "react";

function PostModal() {
    const [activeTab, setActiveTab] = useState("poll"); // Default tab
    const [attachments, setAttachments] = useState([""]); // Initial attachment list

    // Handle adding a new attachment input
    const addAttachment = () => {
        setAttachments([...attachments, ""]);
    };

    // Handle removing an attachment input
    const removeAttachment = (index) => {
        const updatedAttachments = attachments.filter((_, i) => i !== index);
        setAttachments(updatedAttachments);
    };

    // State for Poll options
    const [pollOptions, setPollOptions] = useState(["", ""]); // Start with 2 options

    // State for Survey questions
    const [surveyQuestions, setSurveyQuestions] = useState([
        { type: "yesNo", text: "", equivalents: [] },
    ]);

    // Poll Handlers
    const addPollOption = () => setPollOptions([...pollOptions, ""]);
    const removePollOption = (index) =>
        setPollOptions(pollOptions.filter((_, i) => i !== index));
    const handlePollOptionChange = (index, value) =>
        setPollOptions(
            pollOptions.map((option, i) => (i === index ? value : option))
        );

    // Survey Handlers
    const addSurveyQuestion = () =>
        setSurveyQuestions([
            ...surveyQuestions,
            { type: "yesNo", text: "", equivalents: [] },
        ]);
    const removeSurveyQuestion = (index) =>
        setSurveyQuestions(surveyQuestions.filter((_, i) => i !== index));
    const handleSurveyChange = (index, key, value) =>
        setSurveyQuestions(
            surveyQuestions.map((q, i) =>
                i === index ? { ...q, [key]: value } : q
            )
        );
    const addEquivalent = (index) =>
        handleSurveyChange(index, "equivalents", [
            ...(surveyQuestions[index].equivalents || []),
            "",
        ]);
    const removeEquivalent = (questionIndex, equivalentIndex) =>
        handleSurveyChange(
            questionIndex,
            "equivalents",
            surveyQuestions[questionIndex].equivalents.filter(
                (_, i) => i !== equivalentIndex
            )
        );

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
                        ></textarea>
                        <div className="space-y-2">
                            {attachments.map((_, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <input
                                        type="file"
                                        className="file-input file-input-bordered w-full"
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
                    <form method="dialog">
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
                            <button className="btn btn-neutral">Cancel</button>
                            <button className="btn btn-primary">Confirm Post</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    );
}

export default PostModal;
