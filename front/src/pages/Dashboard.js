import React, { useState } from 'react'
import 'antd/dist/antd.css';
import './Dashboard.css';

import { Skeleton, Switch, Card, Icon, Avatar, Input, Button, Modal, notification , Tag} from 'antd';

import axios from 'axios';


const Dashboard = () => {

    const [apiData, setApiData] = useState({
        definitions: [],
        pronunciation: ''
    });
    const [word, setWord] = useState({
        name: "...",
        loading: apiData.definitions.length == 0 ? true : false,
    });
    const [wordSearch, setWordSearch] = useState('');

    const [loading, setLoad] = useState(true)
    const { Meta } = Card;
    const [popCard, setShowModal] = useState(false);

    async function fetchWordApi() {
        const response = await axios.get(`http://127.0.0.1:8000/word/${wordSearch}`);
        if (Object.keys(response.data).length > 0) {
            setApiData(response.data);
            setWord({ name: wordSearch, loading: false })
            console.log(response.data);
        } else {           
            setWord({ name: wordSearch, loading: true })
            notification.error({
                message: "I didn't find that word ;("
            })
            setTimeout(() => {setShowModal(false);},1000)
        }
    }

    setTimeout(() => { setLoad(false) }, 1000);
    return (
        <div className="App">
            <Modal
                title={word.name}
                visible={popCard}
                onOk={() => setShowModal(false)}
                onCancel={() => setShowModal(false)}
            >
                <Skeleton loading={word.loading} active>      
                    <Tag color="blue">{apiData.pronunciation.all}</Tag>
                    {apiData.definitions.map((def) => {
                        return(
                            <p>{def.definition}</p>
                        )
                    })}        
                </Skeleton> 
            </Modal>
            <Card style={{ width: 300, marginTop: 16 }} loading={loading}>
                <Skeleton loading={loading}>
                    <Meta
                        title="Hi"
                        description="Welcome to the myglish"
                    />
                </Skeleton>
                <nav className="Search" onSubmit={(e) => {
                    e.preventDefault();
                    setShowModal(true);
                }}>
                    <Input onChange={(e) => { setWordSearch(e.target.value) }} required />
                    <Button type="primary" onClick={() => {
                        if (wordSearch) {
                            setShowModal(true);
                            fetchWordApi();
                        }
                        else {
                            notification.error({
                                message: "Opa parece que você não inseriu a palavra que deseja pesquisar."
                            })
                        }
                    }}>Find</Button>
                </nav>
            </Card>

        </div>
    )
}

export default Dashboard;