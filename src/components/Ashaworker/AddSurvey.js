import React, { useState } from "react";
import { AddnewSurvey } from "../../Redux/actions";
import { useDispatch } from "react-redux";
import * as Notficiation from "../../util/Notifications";
export default function AddSurvey({ Shown, toggle }) {
    function back() {
        toggle(Shown);
    }
    const [Input, setInput] = useState("");
    const dispatch = useDispatch();
    const empty = (input) => {
        if (typeof input === "undefined" || input === null) return true;

        return input.replace(/\s/g, "").length < 1;
    };
    const handleSubmit = () => {
        const form = {
            name: Input,
        };
        if (empty(Input) === false) {
            dispatch(AddnewSurvey(form)).then((res) => {
                if (res.status === 201) {
                    Notficiation.Success({ msg: "Survey Created" });
                }
                setInput("");
                back();
            });
        } else {
            Notficiation.Error({ msg: "Empty Input" });
        }
    };
    return (
        <div
            className={`${
                !Shown ? "flex" : "hidden"
            } fixed top-0 left-0 bg-red-100 h-screen w-full items-center justify-center z-10`}>
            <div className="pb-8 px-0 md:w-1/2 lg:w-1/3 bg-white shadow-lg mx-5 rounded">
                <div className="uppercase bg-red-700 pt-3 px-5 pb-2 text-lg text-white font-bold tracking-wide rounded-t">
                    Enter Name of Survey
                </div>
                <div className="px-5">
                    <div className="pb-8 pt-3 px-0 text-gray-800">
                        <input
                            className="w-full focus:shadow-outline px-5 py-1 text-gray-700 bg-gray-200 rounded"
                            onChange={(e) => {
                                setInput(e.target.value);
                            }}
                            value={Input}></input>
                    </div>
                    <div className="flex justify-between font-bold tracking-wide">
                        <div className="flex">
                            <div
                                onClick={back}
                                className="flex items-center justify-center p-2 px-3 md:px-6 rounded bg-gray-300  hover:bg-gray-400 cursor-pointer">
                                Back
                            </div>
                        </div>
                        <div className="flex text-white">
                            <div
                                onClick={handleSubmit}
                                className="flex items-center justify-center rounded p-2 px-3 md:px-6 bg-red-700 hover:bg-red-800 cursor-pointer">
                                Submit
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
