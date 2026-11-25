import React, { useState } from 'react'
import { useSocialStore } from '../store/socialStore'

export const MessagesPage: React.FC = () => {
  const { currentUser, conversations, notes, sendMessage } = useSocialStore()

  const [activeConvId, setActiveConvId] = useState<string>(
    conversations[0]?.id || '',
  )
  const [inputText, setInputText] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'primary' | 'general' | 'requests'>('primary')

  const activeConv =
    conversations.find((c) => c.id === activeConvId) || conversations[0]

  const filteredConversations = conversations.filter(
    (c) =>
      c.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim() || !activeConv) return
    sendMessage(activeConv.id, inputText.trim())
    setInputText('')
  }

  return (
    <div className="w-full h-[calc(100vh-4rem)] flex overflow-hidden border-t border-outline-variant/40">
      {/* LEFT PANE: Conversations list (340px) */}
      <section className="w-full md:w-[340px] lg:w-[380px] flex-shrink-0 flex flex-col h-full bg-surface-container-lowest border-r border-outline-variant">
        {/* Top Header */}
        <div className="flex items-center justify-between p-4 border-b border-outline-variant/40">
          <div className="flex items-center gap-2">
            <span className="font-headline-sm text-body-lg font-bold text-on-surface">
              {currentUser.username}
            </span>
            <span className="material-symbols-outlined text-[18px] text-outline">
              expand_more
            </span>
          </div>
          <button
            type="button"
            className="p-1 text-on-surface-variant hover:text-on-surface rounded-full"
            aria-label="New message"
          >
            <span className="material-symbols-outlined text-[22px]">edit_square</span>
          </button>
        </div>

        {/* Notes Shelf */}
        <div className="p-3 border-b border-outline-variant/40 overflow-x-auto no-scrollbar flex items-center gap-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group"
            >
              <div className="relative">
                {/* Thought bubble note */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-surface-container-high px-2 py-0.5 rounded-full text-[10px] text-on-surface max-w-[80px] truncate border border-outline-variant/60 shadow-sm z-10">
                  {note.note}
                </div>
                <img
                  src={note.avatar}
                  alt={note.username}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-outline-variant group-hover:ring-primary-container transition-all"
                />
              </div>
              <span className="text-[11px] text-outline group-hover:text-on-surface max-w-[64px] truncate text-center">
                {note.username}
              </span>
            </div>
          ))}
        </div>

        {/* Tab switchers */}
        <div className="flex items-center justify-around px-2 pt-2 border-b border-outline-variant/40 text-body-sm font-semibold text-outline">
          <button
            type="button"
            onClick={() => setActiveTab('primary')}
            className={`pb-2 px-3 transition-colors ${
              activeTab === 'primary'
                ? 'text-on-surface border-b-2 border-primary-container'
                : 'hover:text-on-surface'
            }`}
          >
            Primary
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('general')}
            className={`pb-2 px-3 transition-colors ${
              activeTab === 'general'
                ? 'text-on-surface border-b-2 border-primary-container'
                : 'hover:text-on-surface'
            }`}
          >
            General
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('requests')}
            className={`pb-2 px-3 transition-colors ${
              activeTab === 'requests'
                ? 'text-on-surface border-b-2 border-primary-container'
                : 'hover:text-on-surface'
            }`}
          >
            Requests (1)
          </button>
        </div>

        {/* Search bar */}
        <div className="p-3">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined text-[18px] text-outline absolute left-3">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search messages..."
              className="w-full bg-surface-container rounded-full pl-9 pr-4 py-1.5 text-body-sm text-on-surface placeholder:text-outline border border-outline-variant focus:outline-none focus:border-primary-container"
            />
          </div>
        </div>

        {/* Conversation Items */}
        <div className="flex-1 overflow-y-auto divide-y divide-outline-variant/20">
          {filteredConversations.map((conv) => {
            const isSelected = conv.id === activeConv?.id
            return (
              <div
                key={conv.id}
                onClick={() => setActiveConvId(conv.id)}
                className={`flex items-center gap-3 p-3.5 cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-surface-container-high'
                    : 'hover:bg-surface-container/50'
                }`}
              >
                <div className="relative shrink-0">
                  <img
                    src={conv.user.avatar}
                    alt={conv.user.name}
                    className="w-12 h-12 rounded-full object-cover ring-1 ring-outline-variant"
                  />
                  {conv.user.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#10b981] rounded-full ring-2 ring-surface-container-lowest" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-bold text-body-sm text-on-surface truncate">
                      {conv.user.username}
                    </span>
                    <span className="text-[11px] text-outline">
                      {conv.lastMessageTime}
                    </span>
                  </div>
                  <p
                    className={`text-body-sm truncate ${
                      conv.unreadCount > 0
                        ? 'font-bold text-on-surface'
                        : 'text-on-surface-variant'
                    }`}
                  >
                    {conv.lastMessage}
                  </p>
                </div>

                {conv.unreadCount > 0 && (
                  <span className="w-2 h-2 rounded-full bg-primary-container shrink-0" />
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* RIGHT PANE: Chat Viewport */}
      {activeConv ? (
        <section className="hidden md:flex flex-1 flex-col h-full bg-surface">
          {/* Header */}
          <div className="h-16 border-b border-outline-variant px-4 flex items-center justify-between bg-surface-container-lowest/80 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={activeConv.user.avatar}
                  alt={activeConv.user.name}
                  className="w-10 h-10 rounded-full object-cover ring-1 ring-outline-variant"
                />
                {activeConv.user.isOnline && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#10b981] rounded-full ring-2 ring-surface" />
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-body-md text-on-surface leading-tight">
                  {activeConv.user.name}
                </span>
                <span className="text-[11px] text-outline">
                  {activeConv.user.isOnline ? 'Active now' : activeConv.user.lastSeen || 'Offline'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-on-surface-variant">
              <button
                type="button"
                className="p-2 hover:text-on-surface hover:bg-surface-container rounded-full"
                aria-label="Call"
              >
                <span className="material-symbols-outlined text-[22px]">call</span>
              </button>
              <button
                type="button"
                className="p-2 hover:text-on-surface hover:bg-surface-container rounded-full"
                aria-label="Video Call"
              >
                <span className="material-symbols-outlined text-[22px]">videocam</span>
              </button>
              <button
                type="button"
                className="p-2 hover:text-on-surface hover:bg-surface-container rounded-full"
                aria-label="Details"
              >
                <span className="material-symbols-outlined text-[22px]">info</span>
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {activeConv.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[70%] ${
                  msg.isMine ? 'self-end items-end' : 'self-start items-start'
                }`}
              >
                <div
                  className={`px-4 py-2.5 rounded-2xl text-body-sm leading-relaxed ${
                    msg.isMine
                      ? 'bg-primary-container text-white rounded-br-sm shadow'
                      : 'bg-surface-container-high text-on-surface rounded-bl-sm border border-outline-variant/40'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-outline mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={handleSend}
            className="p-3 border-t border-outline-variant bg-surface-container-lowest flex items-center gap-2"
          >
            <button
              type="button"
              className="p-2 text-outline hover:text-on-surface rounded-full"
            >
              <span className="material-symbols-outlined text-[22px]">image</span>
            </button>
            <button
              type="button"
              className="p-2 text-outline hover:text-on-surface rounded-full"
            >
              <span className="material-symbols-outlined text-[22px]">mic</span>
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Message..."
              className="flex-1 bg-surface-container rounded-full px-4 py-2 text-body-sm text-on-surface placeholder:text-outline border border-outline-variant focus:outline-none focus:border-primary-container"
            />

            {inputText.trim() ? (
              <button
                type="submit"
                className="px-4 py-1.5 text-label-md font-bold text-primary-container hover:text-primary-container/80 transition-colors"
              >
                Send
              </button>
            ) : (
              <button
                type="button"
                className="p-2 text-outline hover:text-on-surface rounded-full"
              >
                <span className="material-symbols-outlined text-[22px]">favorite</span>
              </button>
            )}
          </form>
        </section>
      ) : (
        <div className="hidden md:flex flex-1 flex-col items-center justify-center text-outline gap-3">
          <span className="material-symbols-outlined text-6xl">chat</span>
          <p className="font-headline-sm text-body-lg text-on-surface font-semibold">
            Your Messages
          </p>
          <p className="text-body-sm">
            Send private photos and messages to a friend or creator.
          </p>
        </div>
      )}
    </div>
  )
}
