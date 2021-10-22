import React from 'react';
import {Router} from '@reach/router';
import {useQuery} from '@apollo/client';
import Lolly from '../components/Lolly';
import gql from 'graphql-tag';

const GETLOLLY = gql`
query GetLolly {
    getlollies{
        id
        colorTop
        colorMid
        colorBottom
        senderName
        reciepentName
        path
        message
    }
}
`;

export default function VirtualLolly(){
    const {data, error, loading} = useQuery(GETLOLLY);
    if(loading){
        return <h2>LOADING...</h2>
    }
    if(error){
        return<h2>ERROR</h2>
    }
    return(
        <Router basepath = "/lollies">
            {data.getLolly.map((value,key)=>{
                return (
                    <Lolly pageContext={value} path={`/${value.path}`}/>
                )
            })}
        </Router>
    )
}