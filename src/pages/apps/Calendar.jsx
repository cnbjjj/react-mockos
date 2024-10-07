import { useEffect, useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import Layout from "../layout/Layout";

function Calendar() {
    const [today] = useState(new Date());
    const [currentYear, setCurrentYear] = useState(2024);
    const [currentMonth, setCurrentMonth] = useState(1);
    const [date] = useState(new Date());
    const [list, setList] = useState([]);

    useEffect(() => {
        setCurrentYear(today.getFullYear());
        setCurrentMonth(today.getMonth());
    }, []);

    useEffect(() => {
        if (date.getFullYear() === currentYear && date.getMonth() === currentMonth) return;
        date.setFullYear(currentYear);
        date.setMonth(currentMonth);
        date.setDate(1);
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const day = date.getDate();
        const weekDay = date.getDay();
        const months = [1, 3, 5, 7, 8, 10, 12];
        let days = 30;
        if (month in months)
            days = 31;
        if (month == 2)
            days = year % 4 === 0 ? 29 : 28;

        let all = [];
        for (let i = 0; i < days; i++) {
            let t = false;
            let col = '';
            if (month === today.getMonth() + 1 && year === today.getFullYear() && (i + 1) === today.getDate()) t = true;
            if (i === 0) col = ((weekDay + i) % 7);
            all.push({ d: i + 1, w: (weekDay + i) % 7, m: month, y: year, t: t, col: col });
        }
        setList([...all]);
    }, [currentMonth, currentYear]);

    const prev = () => {
        let prevMonth = currentMonth - 1;
        if (prevMonth < 0) {
            prevMonth = 11;
            setCurrentYear(currentYear - 1);
        }
        setCurrentMonth(prevMonth);
    };

    const next = () => {
        let nextMonth = currentMonth + 1;
        if (nextMonth > 11) {
            nextMonth = 0;
            setCurrentYear(currentYear + 1);
        }
        setCurrentMonth(nextMonth);
    };

    return (
        <Layout title='Calendar' >
            <div className=" text-center text-8xl font-[900] text-opacity-10 text-white absolute left-1/2 transform -translate-x-1/2">{currentYear}</div>
            <div>
                <div className="flex justify-center gap-10 items-center m-10">
                    <SlArrowLeft className="text-white cursor-pointer" onClick={prev} />
                    <h3 className="month in text-center text-white font-bold text-xl"> {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][currentMonth]}</h3>
                    <SlArrowRight className="text-white cursor-pointer" onClick={next} />
                </div>
                <ul className="grid grid-cols-7 grid-rows-6 gap-2 justify-center w-[80%] mx-auto my-20">
                    {
                        list.map((date, idx) =>
                            <li
                                key={date.y + date.m + date.d + idx}
                                style={{ gridColumnStart: date.col, '--delay': idx / 100 + 's' }}
                                className={'grid-item in w-10 h-10 bg-white bg-opacity-0 grid items-center text-white font-thin justify-center justify-self-center ' + (date.t ? ' border-b-2 border-white' : ' ')}>
                                {date.d}
                            </li>)
                    }
                </ul>
            </div>
        </Layout >
    )
}
export default Calendar;