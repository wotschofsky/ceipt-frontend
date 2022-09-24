import { useEffect, useState } from "react"
import ReceiptCard from "../components/ReceiptCard"
import apiClient from "../services/apiClient"

import ImageInput from "../components/ImageInput"

export default function Page() {

  const [receipts, setReceipts] = useState<any[]>([])

  useEffect(() => {

    (async () => {

      // const data = await apiClient().postReceipt({ ownerUserId: "linus-balls", img: "moin" })

      const data = await apiClient().getReceiptsByOwnerId("linus-balls")

      setReceipts(data)
    })()
  }, [])

  // if (typeof window !== "undefined") {


  //   let recorder = null

  //   async function recordStream() {
  //       const stream = await captureMediaDevices()
  //       recorder = new MediaRecorder(stream)
  //       let chunks = []

  //       recorder.ondataavailable = (event) => {
  //           if (event.data.size > 0) {
  //               chunks.push(event.data)
  //           }
  //       }

  //       recorder.onstop = () => {
  //           const blob = new Blob(chunks, {
  //               type: 'video/webm;codecs=vp9',
  //           })

  //           chunks = []
  //           const blobUrl = URL.createObjectURL(blob)

  //           console.log(blobUrl)
  //       }

  //       recorder.start(200)
  //   }
  //   recordStream()
  // }

  // navigator.mediaDevices.getUserMedia({ video: true })
  //   .then((stream) => {
  //     /* use the stream */


  //     console.log(stream.getVideoTracks()?.[0])
  //   })
  //   .catch((err) => {
  //     /* handle the error */
  //   });

  // {receipts.slice(0, 1).map(i => <ReceiptCard receipt={i}/>)}

  return <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}><ImageInput /></div>
}