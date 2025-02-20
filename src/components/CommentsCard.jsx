/* eslint-disable react/prop-types */
import "../components/Comments.css";

function CommentsCard({ list }) {
  return (
    <div className="flex flex-col justify-evenly">
      <div className="chat">
        <div className="messages">
          {list.map((item, i) => {
            return (
              <div
                key={i}
                className="message stark flex flex-col break-words text-left"
              >
                {item.comment}
                <span className="font-light text-xs text-gray-400">
                  -{item.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CommentsCard;
