import React from "react";

function JoinModal() {
    return (
        <>
            <dialog id="join_modal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text channel-id text-l">Class/Channel ID</span>
                            </div>
                            <input type="text" placeholder="Enter class ID here. Include the '-'" className="input input-bordered w-full" />
                        </label>
                        {/* if there is a button in form, it will close the modal */}
                        <div className="flex justify-end mt-2 w-full gap-2">
                            <button className="btn btn-neutral">Cancel</button>
                            <button className="btn btn-primary">Join</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    )
}

export default JoinModal;