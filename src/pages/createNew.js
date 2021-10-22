import React, { useRef, useState } from "react"
import Lolly from '../components/Lolly'
import Header from '../components/Header'
import { gql, useMutation, useQuery } from "@apollo/client";
import navigate from 'gatsby'

const GETDATA = gql`
{
    hello
}
`

const CREATELOLLYMUTATION = gql`
mutation createLolly($reciepentName: String!,$message: String!,$sendersName:String!,$colorTop: String!,$colorMid: String!,$colorBottom: String!){
    createLolly(reciepentName: $reciepentName,message: $message,sendersName: $sendersName,colorTop: $colorTop,colorMid: $colorMid,colorBottom: $colorBottom){
        message
        path
    }
}
`

export default function CreateNew() {
    const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    const co1 = '#' + genRanHex(6);
    const co2 = '#' + genRanHex(6);
    const co3 = '#' + genRanHex(6);
    const [color1, setColor1] = useState(co1);
    const [color2, setColor2] = useState(co2);
    const [color3, setColor3] = useState(co3);

    const reciepentsNameRef = useRef();
    const messageRef = useRef();
    const senderRef = useRef();

    const [createLolly] = useMutation(CREATELOLLYMUTATION);

//    const { loading, error, data } = useQuery(GETDATA)

    const submitLollyForm = async () => {
        const result = await createLolly({
            variables:{
                reciepentName:reciepentsNameRef.current.value,
                message:messageRef.current.value,
                sendersName:senderRef.current.value,
                colorTop:color1,
                colorMid:color2,
                colorBottom:color3
            }
        })
        navigate(`/lollies/${result.data.createLolly.path}`)
        console.log("createLolly returned: ", result)
    }
    return (
        <div>
            
            <Header />
            <div className="createNewDiv">
                <div>
                    <Lolly lollyBotom={color3} lollyMid={color2} lollyTop={color1} />
                </div>
                <div className="lollyForm">
                    <label className="colorPickerLabel" htmlFor="top">
                        <input className="colorFlavour" value={color1} type="color" name="top" id="top" onChange={e => {
                            e.preventDefault();
                            setColor1(e.target.value)
                        }} />
                    </label>
                    <label className="colorPickerLabel" htmlFor="top">
                        <input className="colorFlavour" value={color2} type="color" name="top" id="top" onChange={e => {
                            e.preventDefault();
                            setColor2(e.target.value)
                        }} />
                    </label>
                    <label className="colorPickerLabel" htmlFor="top">
                        <input className="colorFlavour" value={color3} type="color" name="top" id="top" onChange={e => {
                            e.preventDefault();
                            setColor3(e.target.value)
                        }} />
                    </label>
                </div>
                <div>
                    <div className="lollyMessage">
                        <label htmlFor="reciepentName">
                            To
                        </label>
                        <input type="text" ref={reciepentsNameRef} name="reciepentName" />

                        <label htmlFor="reciepentName" ref={messageRef}>
                            Message
                        </label>
                        <textarea ref={messageRef} rows="15" columns="30" />


                        <label htmlFor="reciepentName">
                            From
                        </label>
                        <input type="text" ref={senderRef} name="reciepentName" />
                    </div>
                    <input type="button" value="Create" onClick={submitLollyForm} />
                </div>
            </div>
        </div>
    )
}