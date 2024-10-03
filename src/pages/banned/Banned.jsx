import React from 'react'
import Topbar from '../../components/topbar/Topbar_ban'
import Sidebar from '../../components/sidebar/Sidebar'
import Timeline from '../../components/timeline/Timeline'
import Rightbar from '../../components/rightbar/Rightbar'
import './Banned.css'

export default function Banned() {
  return (
    <>
        <Topbar />
        <div className="homeContainer">
            <html lang="ja">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>アカウント凍結</title>
                    <link rel="stylesheet" href="style.css" />
                </head>
                <body>
                    <div class="container">
                        <h1 class="message">あなたは、コミュニティガイドラインに違反したため、<br></br>アカウントが凍結されました。</h1>
                        <p>詳細については、お問い合わせください。</p>
                    </div>
                </body>
            </html>
        </div>
    </>
  )
}

