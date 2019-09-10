
export const resolvePromise = (promise: Promise<Response>, callback: Function, reject: Function) => {
  promise.then((resolve: Response) => {
    if (resolve.ok) {
      return resolve.json();
    } else {
      Promise.reject()
      throw new Error("Error");
    }
  }).then((result) => callback(result))
    .catch(err => reject(err))
}

export const resolveAllPromise = (promises: Array<Promise<Response>>, callback: (context: Array<any>) => {}, reject: Function) => {
  const dataArray: any = [];
  let index = 0;
  promises.map((x, i) => resolvePromise(x, (result: any) => {
    console.log(result.length)
    dataArray.push({[i]:result});
    console.log(JSON.stringify(dataArray))
    index = index + 1;
  }, (err) => {
    dataArray.push(err)
  }));
  if (dataArray.length > 0) console.log('yes contain some data');
  callback(dataArray);
}