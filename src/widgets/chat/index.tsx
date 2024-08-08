'use client';
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Markdown from 'react-markdown';
import { PropagateLoader } from 'react-spinners';

export interface MessageInterface {
  role: 'user' | 'ai';
  message: string;
}

const Chat = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const Message = (message: MessageInterface) => {
    return (
      <div className={'w-full flex items-center justify-end my-1'}>
        {message.role == 'ai' ? (
          <div className={'w-full p-1 md:p-2 flex items-start gap-1'}>
            <img
              src={'/images/doctor_sara_chat_avatar.png'}
              className={'w-3'}
            />
            <Markdown className={'text-sm whitespace-pre-wrap text-white'}>
              {message.message}
            </Markdown>
          </div>
        ) : (
          <div
            className={
              'w-3/4 p-1 md:p-2 flex justify-self-end rounded-xl bg-white bg-opacity-20 self-end items-start gap-1'
            }>
            <p className={'text-sm whitespace-pre-wrap text-white'}>
              {message.message}
            </p>
          </div>
        )}
      </div>
    );
  };

  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [isPending, setIsPending] = useState(false);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMessage = async (message: string) => {
    setIsPending(true);
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'user', message: message },
    ]);
    const { data } = await axios.get(
      `https://functions.yandexcloud.net/d4ejq3uthmcfado341qo?action=search&query=${message}&verbose_ru=true&namespace=atopianews&index=atopianews&top_k=1`
    );
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'ai', message: data },
    ]);
    setIsPending(false);
  };

  const [newMessage, setNewMessage] = useState('');

  const handleKeyPress = async (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (newMessage.trim()) {
        await handleMessage(newMessage);
        setNewMessage('');
      }
    }
  };

  return (
    <>
      {isChatOpen ? (
        <div
          className={
            'fixed z-[9999] flex justify-center items-center top-0 left-0 w-full h-full bg-custom-radial'
          }>
          <img
            onClick={() => {
              setIsChatOpen(false);
            }}
            className={'w-4 absolute right-2 top-2 cursor-pointer'}
            src={'/images/close.svg'}
          />
          <div
            className={
              'w-[90%] flex flex-col bg-black bg-opacity-15 backdrop-blur-xl p-2 md:p-3 rounded-2xl h-5/6'
            }>
            <p className={'font-bold flex-none text-white'}>
              Чат с ассистентом
            </p>
            <div className={'overflow-y-scroll flex-1 p-1 md:p-2 '}>
              {messages.map((msg, counter) => (
                <Message key={counter} {...msg} />
              ))}
              <div ref={messagesEndRef}></div>
            </div>
            <div
              className={'w-full flex items-center px-2 mt-2 gap-2 flex-none'}>
              {!isPending ? (
                <>
                  <textarea
                    onChange={(event) => setNewMessage(event.target.value)}
                    onKeyPress={handleKeyPress}
                    value={newMessage}
                    rows={3}
                    placeholder={'Сообщение'}
                    className={
                      'w-full text-sm p-1 border-2 border-white bg-transparent text-white placeholder:text-white placeholder:text-opacity-50 rounded-xl h-4'
                    }></textarea>
                  {newMessage && (
                    <div
                      onClick={async () => {
                        await handleMessage(newMessage);
                        setNewMessage('');
                      }}
                      className={
                        'h-full p-1 rounded-full flex items-center justify-center aspect-square bg-cOrange'
                      }>
                      <img
                        className={'w-full h-full'}
                        src={'/images/send.svg'}
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className={'w-full flex justify-center'}>
                  <PropagateLoader color={'#FFF'} />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div
          id={'dr_sara'}
          onClick={() => {
            setIsChatOpen(true);
          }}
          className={
            'fixed z-[99999] cursor-pointer bottom-2 right-2 flex items-center'
          }>
          <div
            className={
              'w-[19rem] h-[10rem] flex items-center justify-start -mr-2 relative'
            }>
            <img
              src={'/images/doctor_sara_chat.svg'}
              className={'absolute z-[-1] w-full left-0 drop-shadow-2xl'}
            />
            <p className={'text-sm pl-2'}>
              Чат с AI <br />
              ассистентом
            </p>
          </div>
          <img src={'/images/doctor_sara_chat_avatar.png'} className={'w-10'} />
        </div>
      )}
    </>
  );
};

export default Chat;
