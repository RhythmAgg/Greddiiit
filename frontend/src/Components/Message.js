import TimeAgo from 'javascript-time-ago'
import Logo from '../img/avatar.jpeg'


// English.
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')


export default function Message({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={Logo}
          alt=""
        />
        <p className="messageText" style={{'wordBreak': 'break-all'}}>{message.text}</p>
      </div>
      <div className="messageBottom">{timeAgo.format(new Date(message.creation_time))}</div>
    </div>
  );
}