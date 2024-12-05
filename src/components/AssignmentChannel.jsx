import React, { useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';
import './styles/AssignmentChannel.css'

const SUPABASE_URL = "https://bwkkphvzmigjrnyptzhv.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3a2twaHZ6bWlnanJueXB0emh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE2NTQ1MjYsImV4cCI6MjA0NzIzMDUyNn0.VObIEpLVaxmi6wW8fL3TCMTzfLswcB6cawsFbVgcXmQ"; // Replace with your Supabase anon key

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function AssignmentChannel({ token }) {
    const [activeTab, setActiveTab] = useState("to-do");

    // Render Tab Content
    const renderContent = () => {
        switch (activeTab) {
            case "to-do":
                return (
                    <div>
                        <h2 className="text-lg font-bold">This is where all active asignments are</h2>

                    </div>
                );
            case "submitted":
                return (
                    <div>
                        <h2 className="text-lg font-bold">This is where all submitted assignments are</h2>

                    </div>
                );

            case "created-assignments":
                return (
                    <div>
                        <h2 className="text-lg font-bold">This is where all assignments you created are</h2>

                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <div role="tablist" className="tabs tabs-boxed">
                <a
                    role="tab"
                    className={`tab ${activeTab === "to-do" ? "tab-active" : ""
                        }`}
                    onClick={() => setActiveTab("to-do")}
                >
                    To-Do
                </a>
                <a
                    role="tab"
                    className={`tab ${activeTab === "submitted"
                        ? "tab-active"
                        : ""
                        }`}
                    onClick={() => setActiveTab("submitted")}
                >
                    Submitted
                </a>
                <a
                    role="tab"
                    className={`tab ${activeTab === "created-assignments" ? "tab-active" : ""
                        }`}
                    onClick={() => setActiveTab("created-assignments")}
                >
                    Created
                </a>
            </div>
            <div className="mt-4">{renderContent()}</div>
        </>
    );
}

export default AssignmentChannel;
