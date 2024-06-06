import { Session } from "next-auth";

// props로 들어오는 유저 정보 타입 설정
interface Props {
  session: Session;
}

export default function SiginForm({session} :Props){

  const email = session?.user?.email || ''; // email이 존재하지 않을 때를 대비하여 빈 문자열로 설정
  let defaultPlaylist = JSON.stringify([]);

  return(
    <form method="POST" action={'/api/post/userdata'}>
      <div>
        <label htmlFor="name">이름</label>
        <input 
          id="name" 
          name="name" 
          required
        />
      </div>
      <div>
        <label>이메일</label>
        <input 
          name="email" 
          defaultValue={email} 
          style={{background:'#eee'}} 
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
      <button type="submit">회원가입</button>
    </form>
  )
}