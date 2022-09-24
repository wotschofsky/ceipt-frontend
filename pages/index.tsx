import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import ImageInput, { FullFileValue } from '../components/ImageInput';
import ReceiptCard from '../components/ReceiptCard';
import apiClient from '../services/apiClient';

interface DefaultState {
  type: 'DEFAULT';
}
interface LoadingState {
  type: 'LOADING';

  fileData: FullFileValue;
}
interface ReadyToSubmitState {
  type: 'READY_TO_SUBMIT';

  fileData: any;
  receiptData: any;
}

type PageState = DefaultState | LoadingState | ReadyToSubmitState;

const defaultState: DefaultState = { type: 'DEFAULT' };

export default function Page() {
  const [pageState, setPageState] = useState<PageState>(defaultState);

  const [receipts, setReceipts] = useState<any[]>([]);

  const useFormValue = useForm({ shouldUseNativeValidation: true });

  const { handleSubmit } = useFormValue;

  const onSubmit = async (data: {fileValue: FullFileValue}) => {
    const { fileValue } = data;

    setPageState({ type: 'LOADING', fileData: fileValue });

    const receiptData = await apiClient().getReceiptFromImg(fileValue.url)

    // const receiptData = (
    //   await apiClient().getReceiptsByOwnerId('linus-balls')
      
    // ).slice(0, 1);

    setPageState({ type: 'READY_TO_SUBMIT', fileData: fileValue, receiptData });
  };

  if (pageState.type === 'DEFAULT')
    return (
      <div>
        <div
          style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <ImageInput useFormValue={useFormValue} field="fileValue" />
        </div>
        <button onClick={handleSubmit(onSubmit)}>ballern</button>
      </div>
    );
  // return (
  //   <form onSubmit={handleSubmit(onSubmit)}>
  //     <input
  //       {...register("firstName", { required: "Please enter your first name." })}
  //     />
  //     <input type="submit" />
  //   </form>
  // );

  if (pageState.type === 'READY_TO_SUBMIT')
    return <ReceiptCard receipt={pageState.receiptData} />;

  // useEffect(() => {

  //   (async () => {

  //     // const data = await apiClient().postReceipt({ ownerUserId: "linus-balls", img: "moin" })

  //     const data = await apiClient().getReceiptsByOwnerId("linus-balls")

  //     setReceipts(data)
  //   })()
  // }, [])

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
}
