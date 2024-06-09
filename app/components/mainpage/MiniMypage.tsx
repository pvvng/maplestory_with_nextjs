import { Document, WithId } from "mongodb"
import SongHeartBtn from "../heartbtn/SongHeartBtn";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import PlayList from "../playlist/PlayList";

interface PropsType {
  userdata : WithId<Document> | undefined,
  albumArr : string[]
}

let CardContainer = styled.div`
  width : 100%;
  padding : 30px;
  border-radius :10px;
  margin-top : 30px;
  border : 1px solid #D2D2D2;
`
let GoBtn = styled.button`
  transition :all 0.5s;
  border : none;
  font-size : 14px;

  &:hover{
    background :#CC0000;
  }
`

export default function MiniMypage({userdata, albumArr} :PropsType){

  let router = useRouter();

  if(userdata !== undefined){
    let userName = userdata.name;
    let userPlaylist = JSON.parse(userdata.playlist);

    return (
      <CardContainer>
        <PlayList userdata={userdata} albumArr={albumArr} />

        <div style={{textAlign:'right'}}>
          <GoBtn className="btn btn-secondary mt-3" onClick={()=>{
            router.push('/mypage');
          }}>마이페이지로 이동</GoBtn>
        </div> 
      </CardContainer>
    )  
  }else{
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  }

}