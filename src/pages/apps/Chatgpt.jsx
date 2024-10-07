import React from 'react'
import Layout from '../layout/Layout'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Chatgpt() {
    const get = async (config = { method: 'get', data: {}, url: '', responseType: 'json' }, cb) => {
        try {
            const res = await axios({ ...config });
            cb(res.data);
        } catch (error) {
            console.log(error);
            cb(null);
        }
    };
    const [res, setRes] = useState();
    useEffect(() => {
        get({ url: "https://api.andrespecht.dev/movies" }, setRes);
        console.log('entered');
    }, [])
    useEffect(() => {
        if (res) {
            console.log("res changed");
            console.log(res);
        }

    }, [res])
    return (
        <Layout title='ChatGPT 4'>

        </Layout>
    )
}

export default Chatgpt