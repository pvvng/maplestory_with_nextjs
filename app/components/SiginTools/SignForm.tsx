import { Session } from "next-auth";

// props로 들어오는 유저 정보 타입 설정
interface Props {
  session: Session;
}

export default function SiginForm({session} :Props){

  const email = session?.user?.email || ''; // email이 존재하지 않을 때를 대비하여 빈 문자열로 설정
  const image = session?.user?.image || '';
  let defaultPlaylist = JSON.stringify([]);

  return(
    <form className="p-5" method="POST" action={'/api/post/userdata'}>
      <div className="m-3">
        <label htmlFor="name">이름</label>
        <input 
          style={{width:'100%'}}
          id="name" 
          name="name" 
          required
        />
      </div>
      <div className="m-3">
        <label>이메일</label>
        <input 
          name="email" 
          defaultValue={email} 
          style={{background:'#eee', width:'100%'}} 
          readOnly
        />
      </div>
      <div>
        <input 
          name="playlist" 
          defaultValue={defaultPlaylist} 
          style={{display:'none'}} 
        />
      </div>
      <input className="m-3" name="image" defaultValue={image} style={{display:'none'}} />
      <button style={{float:'right'}} type="submit">회원가입</button>
      <div style={{clear:'both'}}></div>
    </form>
  )
}