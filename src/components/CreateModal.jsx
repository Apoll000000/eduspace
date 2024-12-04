import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import alpha from "../assets/alpha.png";
import beta from "../assets/beta.png";
import delta from "../assets/delta.png";
import epsilon from "../assets/epsilon.png";
import eta from "../assets/eta.png";
import gamma from "../assets/gamma.png";

function CreateModal({ token }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImageName, setSelectedImageName] = useState(null);
    const [channelName, setChannelName] = useState("");
    const [sectionName, setSectionName] = useState("");
    const [channelPurpose, setChannelPurpose] = useState("");
    const [gradingSystem, setGradingSystem] = useState("");

    const images = [alpha, beta, delta, epsilon, eta, gamma];
    const imageNames = ["alpha", "beta", "delta", "epsilon", "eta", "gamma"];  // Image name list

    // Supabase client setup
    const SUPABASE_URL = "https://bwkkphvzmigjrnyptzhv.supabase.co"; // Replace with your Supabase URL
    const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3a2twaHZ6bWlnanJueXB0emh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE2NTQ1MjYsImV4cCI6MjA0NzIzMDUyNn0.VObIEpLVaxmi6wW8fL3TCMTzfLswcB6cawsFbVgcXmQ"; // Replace with your Supabase anon key

    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    const [alertMessage, setAlertMessage] = useState(null); // State for alert messages
    const [alertType, setAlertType] = useState("alert-info"); // Alert type (info, success, error)

    useEffect(() => {
        console.log("Alert type changed to:", alertType);
    }, [alertType]);

    // Generate random channel code
    const generateChannelCode = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 3; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        code += '-';
        for (let i = 0; i < 3; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        code += '-';
        for (let i = 0; i < 3; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    };

    // Handle form submission
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const channelCode = generateChannelCode();
        const creatorId = token?.user?.id; // Assuming token contains the user ID

        if (!selectedImage) {
            setAlertMessage("Please Select Channel Image");
            setAlertType("alert-error");
        } else {
            const { data: channelData, error: channelError } = await supabase
                .from('tbl_channels')
                .insert([
                    {
                        creator_id: creatorId,
                        channel_name: channelName,
                        channel_code: channelCode,
                        section_name: sectionName,
                        channel_purpose: channelPurpose,
                        grading_system: gradingSystem,
                        channel_image: selectedImageName, // Store the image name, not the URL
                    }
                ])
                .single(); // Get single data object

            if (channelError) {
                setAlertMessage("Error Creating Channel");
                setAlertType("alert-error");
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } else {
                setAlertMessage("Channel Created Succesfully");
                setAlertType("alert-success");
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }

            // Step 2: Create an enrollment entry in tbl_enrollments
            const { data: enrollmentData, error: enrollmentError } = await supabase
                .from('tbl_enrollments')
                .insert([
                    {
                        channel_code: channelCode, // Link to the newly created channel
                        user_id: creatorId, // Automatically enroll the creator
                    }
                ]);

            if (enrollmentError) {
                setAlertMessage("Error Enrolling Creator to Channel");
                setAlertType("alert-error");
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }
        }

    };


    return (
        <>
            <dialog id="create_modal" className="modal">
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

                    <form onSubmit={handleSubmit}>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text channel-id text-l">Channel/Class Name</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Enter your desired channel/class name"
                                className="input input-bordered w-full"
                                required
                                value={channelName}
                                onChange={(e) => setChannelName(e.target.value)}
                            />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text channel-id text-l">Section Name</span>
                            </div>
                            <input
                                type="text"
                                placeholder="You can leave this blank if not applicable"
                                className="input input-bordered w-full"
                                value={sectionName}
                                onChange={(e) => setSectionName(e.target.value)}
                            />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text channel-id">What is this channel for?</span>
                            </div>
                            <select
                                className="select select-bordered"
                                value={channelPurpose}
                                onChange={(e) => setChannelPurpose(e.target.value)}
                                required
                            >
                                <option disabled selected>Select one</option>
                                <option>School/University</option>
                                <option>Group Study</option>
                                <option>Private Organization</option>
                            </select>
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text channel-id">Grading System</span>
                            </div>
                            <select
                                className="select select-bordered"
                                value={gradingSystem}
                                onChange={(e) => setGradingSystem(e.target.value)}
                                required
                            >
                                <option disabled selected>Select one</option>
                                <option>Not Applicable</option>
                                <option>Grade Point Scale (1.00 - 5.00)</option>
                                <option>Percentage</option>
                            </select>
                        </label>

                        {/* Channel Image Selection */}
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text channel-id">Channel Image</span>
                            </div>
                            <button
                                type="button"
                                className="btn btn-outline"
                                onClick={() => document.getElementById("image_modal").showModal()}
                            >
                                Select Image
                            </button>
                            {selectedImage && (
                                <div className="mt-2">
                                    <img src={selectedImage} alt="Selected" className="w-24 h-24 rounded-lg" />
                                </div>
                            )}
                        </label>

                        <div className="flex justify-end mt-2 w-full gap-2">
                            <button className="btn btn-neutral" type="button" onClick={() => document.getElementById("create_modal").close()}>Cancel</button>
                            <button className="btn btn-primary" type="submit">Confirm</button>
                        </div>
                    </form>
                </div>
            </dialog>

            {/* Image Selection Modal */}
            <dialog id="image_modal" className="modal">
                <div className="modal-box">
                    <h3 className="text-lg font-bold">Select a Channel Image</h3>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className={`cursor-pointer border ${selectedImage === image ? "border-primary" : "border-transparent"} p-1 rounded-lg`}
                                onClick={() => {
                                    setSelectedImage(image);
                                    setSelectedImageName(imageNames[index]);  // Store only image name
                                    document.getElementById("image_modal").close();
                                }}
                            >
                                <img src={image} alt={`Image ${index + 1}`} className="w-full h-auto rounded-lg" />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end mt-4">
                        <button className="btn" onClick={() => document.getElementById("image_modal").close()}>
                            Close
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    );
}

export default CreateModal;
