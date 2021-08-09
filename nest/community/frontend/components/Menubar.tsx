import React, { useCallback } from 'react';
import { client } from '../api/defaultClient';

const Menubar = () => { 
    const loginClickListener = useCallback(() => {
        window.location.href = 'http://localhost:3065/api/auth/google';
    }, [])

    const isExtendedLogin = useCallback(() => {
        client.get('/auth/refresh');
    }, [])

    const clickAccessListener = useCallback(() => {
        client.get('/auth')
            .then((res) => console.log(res.data))
            .catch((err) => console.error(err));
    }, [])
    
    return (
        <nav className=" bg-white w-full flex relative justify-between items-center mx-auto px-8 h-20">
            <div className="inline-flex">
                <a className="_o6689fn" href="/">
                    Home
                </a>
            </div>
            <div className="hidden sm:block flex-shrink flex-grow-0 justify-start px-2">
                <div className="inline-block">
                    <div className="inline-flex items-center max-w-full">
                        <button className="flex items-center flex-grow-0 flex-shrink pl-2 relative w-60 border rounded-full px-1  py-1" type="button">
                            <div className="block flex-grow flex-shrink overflow-hidden">Start your search</div>
                            <div className="flex items-center justify-center relative  h-8 w-8 rounded-full">
                                <svg
                                    viewBox="0 0 32 32"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                    role="presentation"
                                    focusable="false"
                                    style={{ display: "block", fill: "none", width: "12px", height: "12px", stroke: "currentcolor", strokeWidth: "5.33333", overflow: "visible" }}
                                >
                                    <g fill="none">
                                        <path
                                            d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"
                                        ></path>
                                    </g>
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex-initial">
            <div className="flex justify-end items-center relative">    

                <div className="block">
                    <div onClick={ clickAccessListener } style={{ cursor: "pointer" }}>access</div>
                    <div onClick={ isExtendedLogin } style={{ cursor: "pointer" }}>연장</div>
                    { true ? <div onClick={ loginClickListener} style={{ cursor: "pointer" }}>Login</div> : <div className="inline relative">
                        <button type="button" className="inline-flex items-center relative px-2 border rounded-full hover:shadow-lg">
                            <div className="pl-1">
                                <svg
                                    viewBox="0 0 32 32"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                    role="presentation"
                                    focusable="false"
                                    style={{ display: "block", fill: "none", height: "16px", width: "16px", stroke: "currentcolor", strokeWidth: "3", overflow: "visible" }}
                                >
                                    <g fill="none" fill-rule="nonzero">
                                        <path d="m2 16h28"></path>
                                        <path d="m2 24h28"></path>
                                        <path d="m2 8h28"></path>
                                    </g>
                                </svg>
                            </div>

                            <div className="block flex-grow-0 flex-shrink-0 h-10 w-12 pl-5">
                                <svg
                                    viewBox="0 0 32 32"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                    role="presentation"
                                    focusable="false"
                                    style={{ display: "block", height: "100%", width: "100%", fill: "currentcolor" }}
                                >
                                    <path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path>
                                </svg>
                            </div>
                        </button>
                    </div>}
                </div>
            </div>
            </div>
        </nav>
    )
}

export default Menubar;
