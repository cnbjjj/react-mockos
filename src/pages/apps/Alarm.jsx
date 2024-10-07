import React, { useState, useEffect } from 'react';
import Layout from "../layout/Layout";
import Picker from 'react-mobile-picker';
import { FcAlarmClock } from 'react-icons/fc';

function Alarm() {
    const [currentTime, setCurrentTime] = useState('--:--');
    const [alarmTime, setAlarmTime] = useState({ hours: '--', minutes: '--' });
    const [alarmOn, setAlarmOn] = useState(false);
    const [isPickerShow, setIsPickerShow] = useState(false);

    useEffect(() => {
        const getCurrentTime = () => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        };
        const interval = setInterval(() => setCurrentTime(getCurrentTime()), 1000);
        setCurrentTime(getCurrentTime());
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let alarmInterval;
        if (alarmOn) {
            alarmInterval = setInterval(() => {
                if (currentTime === `${alarmTime.hours}:${alarmTime.minutes}`) {
                    alert('Alarm!');
                    setAlarmOn(false);
                }
            }, 1000);
        }
        return () => clearInterval(alarmInterval);
    }, [alarmOn, alarmTime, currentTime]);

    useEffect(() => {
        if (alarmTime.hours === '--' || alarmTime.minutes === '--')
            setAlarmOn(false);
        else
            setAlarmOn(true);
    }
        , [alarmTime]);

    useEffect(() => {
        if (!alarmOn) {
            setAlarmTime({ hours: '--', minutes: '--' });
        }
    }, [alarmOn]);

    const togglePicker = () => {
        const on = !isPickerShow;
        setIsPickerShow(on);
    };

    const alarmClick = () => {
        if (alarmTime.hours === '--' || alarmTime.minutes === '--') return;
        setAlarmOn(!alarmOn);
    };

    const timeSelections = {
        hours: Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0')),
        minutes: Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'))
    };

    return (
        <Layout title='Alarm'>
            <div className='justify-center w-full mx-auto text-center'>
                <div className={` text-[100px] text-center text-white mb-4 p-2 font-thin`}>{currentTime}</div>
                <FcAlarmClock className={`inline text-2xl ${alarmOn ? 'on' : 'off saturate-0'}`} onClick={alarmClick} ></FcAlarmClock>
                <div className="mb-4 p-4 text-center flex justify-center gap-2 items-center font-thin">
                    <span className="text-2xl text-white" onClick={togglePicker}>{alarmTime.hours}:{alarmTime.minutes}</span>
                </div>
                <div className="mb-4 text-white font-thin">
                    {(isPickerShow) && (
                        <Picker value={alarmTime} onChange={setAlarmTime}>
                            {Object.keys(timeSelections).map(name => (
                                <Picker.Column key={name} name={name}>
                                    {timeSelections[name].map(option => (
                                        <Picker.Item key={option} value={option}>
                                            {option}
                                        </Picker.Item>
                                    ))}
                                </Picker.Column>
                            ))}
                        </Picker>
                    )}
                </div>
            </div>
        </Layout>
    );
}
export default Alarm;