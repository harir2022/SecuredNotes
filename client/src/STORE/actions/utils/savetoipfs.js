import axios from "axios";


export const savetoipfs = async (note)=>{         
          
          // Pin the JSON object to IPFS using the Pinata API
      const res =   await   axios.post('https://api.pinata.cloud/pinning/pinJSONToIPFS', note, {
          headers: {
               'Content-Type': 'application/json',
               'pinata_api_key': 'f36a3cd84e3c8656463b',
               'pinata_secret_api_key': 'fdf71f6ffa996f75a561d2c67f81d63a86fee1f3ddc9aa55a9c13326258b2330'
          }
          }).then((response) => {
          // console.log('JSON object pinned to IPFS:', response.data.IpfsHash);
                    return response.data.IpfsHash;
          }).catch((error) => { 
          console.error('Error pinning JSON object to IPFS:', error);
          });
          console.log(res)
          return res;

}


export const getfromipfs = async (id)=>{         
          
  // const gateway =`https://gateway.pinata.cloud/ipfs/${id}`;
  // const gateway =`https://ipfs.io/ipfs/${id}`;
  const gateway =`https://cloudflare-ipfs.com/ipfs/${id}`;
  const {data}  = await   axios.get(gateway);
  
  return data;
}

export const deletefilefromipfs = async(id)=>{
  
  var config = {
    method: 'delete',
    url: `https://api.pinata.cloud/pinning/unpin/${id}`,
    headers: { 
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2NGQwYzQwNC1lOWNkLTQzZGQtOGRhMC05YjE4ZDVjY2NkZTUiLCJlbWFpbCI6ImhhcmlqYXZhc2NyaXB0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIyYjQyZDZjYzA1ZjBkNGU3MWNhMSIsInNjb3BlZEtleVNlY3JldCI6Ijk2OTZkZDEzNTU0ODI2NzE5YjE4Yzk0MGRiYmMzNWIwZmEwM2Y3NTFkYzE4MjJhMzYxMDFjMjU4ZmIzOTZmMTkiLCJpYXQiOjE2ODA3NzExOTZ9.0LRQv99uv4aK_H7gXEf7AI2_dcGlrmbIiYqCmvyL5b0'
    }
  };
  
  const res = await axios(config);
  console.log("deleted success" + res)
  return res;
  
}