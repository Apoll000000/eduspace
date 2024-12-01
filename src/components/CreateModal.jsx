import { useState, useEffect } from 'react'
import alpha from "../assets/alpha.png";
import beta from "../assets/beta.png";
import delta from "../assets/delta.png";
import epsilon from "../assets/epsilon.png";
import eta from "../assets/eta.png";
import gamma from "../assets/gamma.png";

function CreateModal() {
    const [selectedImage, setSelectedImage] = useState(null);

    const images = [alpha, beta, delta, epsilon, eta, gamma];
    
    return (
        <>
            <dialog id="create_modal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text channel-id text-l">Channel/Class Name</span>
                            </div>
                            <input type="text" placeholder="Enter your desired channel/class name" className="input input-bordered w-full" />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text channel-id text-l">Section Name</span>
                            </div>
                            <input type="text" placeholder="You can leave this blank if not applicable" className="input input-bordered w-full" />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text channel-id">What is this channel for?</span>
                            </div>
                            <select className="select select-bordered">
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
                            <select className="select select-bordered">
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
                            <button className="btn btn-neutral">Cancel</button>
                            <button className="btn btn-primary">Confirm</button>
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
    )
}

export default CreateModal;