"use client";
import { ConnectButton, useActiveAccount } from "thirdweb/react";

import { client } from "@/server";
import { myChain } from "@/server/contracts/message";

// 导入 SendMessage 和 ReceiveMessage 组件
import { SendMessage } from "@/components/message/sendMessage";
import { ReceiveMessage } from "@/components/message/receiveMessage";
import { Header } from "@/components/header";

export default function Message() {
  // 使用 useActiveAccount 钩子来检查用户是否已连接钱包
  const activeAccount = useActiveAccount();

  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
      <div className="py-20 w-full">
        <Header />

        <div className="flex flex-col items-center mb-20">
          <ConnectButton
            client={client}
            chain={myChain}
            appMetadata={{
              name: "Example App",
              url: "localhost:3000",
            }}
          />
          {/* 只有在钱包连接后才显示 SendMessage 和 ReceiveMessage 组件 */}
          {activeAccount && (
            <div className="flex flex-row justify-between items-start gap-8 mt-10 w-full">
              {/* 发送消息组件 */}
              <div className="flex-1 min-w-[40%]">
                <SendMessage />
              </div>

              {/* 接收消息组件 */}
              <div className="flex-1 min-w-[60%]">
                <ReceiveMessage />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
