import { useState } from "react";
import BaseWrapper from "../components/home/BaseWrapper";
import MainWrapper from "../components/home/MainWrapper";
import Message from "../components/home/Message";
import MessageInput from "../components/home/MessageInput";
import MessageWrapper from "../components/home/MessageWrapper";
import NavWrapper from "../components/home/NavWrapper";
import { UserNavAvatar, UserNavWrapper } from "../components/home/UserNav";

export const Home: React.FC = () => {
  const [input, setInput] = useState("");

  return (
    <BaseWrapper>
      <NavWrapper>
        <UserNavWrapper>
          <UserNavAvatar
            src='https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTE4MDAzNDEwNzg5ODI4MTEw/barack-obama-12782369-1-402.jpg'
            alt=''
          />
          <span style={{ alignSelf: "center", marginLeft: "15px" }}>
            username
          </span>
        </UserNavWrapper>
      </NavWrapper>
      <MainWrapper>
        <MessageWrapper>
          <Message
            message={{
              author: "obama",
              content: "hi",
              avatar:
                "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTE4MDAzNDEwNzg5ODI4MTEw/barack-obama-12782369-1-402.jpg",
              timestamp: "2022-02-06 08:35:39",
            }}
          />
        </MessageWrapper>
        <MessageInput
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder='Send message'
        />
      </MainWrapper>
    </BaseWrapper>
  );
};
