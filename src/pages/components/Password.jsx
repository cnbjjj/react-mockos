import React, { useEffect, useRef, useState } from 'react'
import { motion as m } from 'framer-motion'
import { animWithDelay, scale } from '../layout/Anims';
import { gsap } from 'gsap'

function Password({ pwd, testPwd = '1234', onPasswordCorrect = () => { } }) {

    const [pass, setPass] = useState('');
    const passwordRef = useRef(null);

    useEffect(() => {
        let id = 0;
        togglePass(false);
        passwordRef?.current.querySelectorAll('.password').forEach((input, i) => {
            input.value = pass.at(i) ?? '';
        });
        if (pass.length >= (testPwd ?? pwd).length) {
            if (pass.includes(testPwd ?? pwd)) {
                onPasswordCorrect();
            } else {
                togglePass();
                gsap.to('.passwords', 0.075, { x: "+=10", yoyo: true, repeat: 5 });
                id = setTimeout(() => {
                    setPass('');
                }, 1000);
                return;
            }
            return;
        }
    }, [pass]);

    const togglePass = (show = true) => {
        passwordRef?.current.querySelectorAll('.password').forEach(input => show ? input.type = 'text' : input.type = 'password');
    }

    const numberClicked = (e) => {
        setPass(pass + e.target.innerText);
    };

    const variants = scale;
    return (
        <section className='mx-auto text-center grid justify-center' ref={passwordRef}>
            <h2 className='text-white font-thin'>Enter Passcode</h2>
            <ul className={`passwords flex gap-3 justify-evenly m-10 mt-4 mb-16`}>
                {
                    Array(testPwd.length).fill().map((_, i) =>
                        <li key={i}><input className='password rounded-full text-white w-8 h-8 text-center bg-transparent border-gray-50 border select-none pointer-events-none font-thin' type="password" /></li>
                    )
                }
            </ul>
            <ul className='grid gap-4 grid-cols-3 align-middle justify-center w-fit mx-auto'>
                {(
                    Array(10).fill(0).map((_, i) => {
                        return <m.li
                            variants={animWithDelay(0.01 * i)}
                            initial="init"
                            animate="final"
                            exit="exit"
                            key={i} onClick={numberClicked} className='number-pwds'>{(i + 1) % 10}</m.li>
                    })
                )}
            </ul>
        </section>
    )
}
export default Password