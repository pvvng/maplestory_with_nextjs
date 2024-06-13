'use client'

import styled from "styled-components"

let SongContainerBox = styled.div`
    width: 100%;
    border : 1px solid #D2D2D2;
    border-radius : 10px;
    padding : 20px;
`

export default function PopularSong (){
    return(
        <SongContainerBox>
            가나다라마바사
        </SongContainerBox>
    )
}