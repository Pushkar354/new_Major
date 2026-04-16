// const { GoogleGenAI} = require("@google/genai");
// const axios=require('axios');
// const YoutubeVideo=async(req,res)=>{
//     const{query}=req.body;
//     if(!query){
//         res.status(400).json({success:false,msg:"invalid query"})
//     }
//   const videos=await SemanticSearch(query);
//   if(!videos){
//     res.status(400).json({success:false,msg:"invalid query"})
//   }
//    res.status(200).json({success:true,data:videos});
// }

// const fetchyoutube=async(query,maxResults)=>{
//     try{
//    const {data}=await axios.get("https://www.googleapis.com/youtube/v3/search",{
//       params: {
//         part: "snippet",
//         q: query,
//         type: "video",
//         maxResults,
//         key: process.env.YOUTUBE_API_KEY,
//       },
//    })
//    const videos=data.items.map(video=>({id:video.id.videoId,
//     title:video.snippet.title,
//     description:video.snippet.description,
//     thumbnail:video.snippet.thumbnails.medium.url,
//     url:`https://www.youtube.com/watch?v=${video.id.videoId}`,
//     similarity:0
//    }))
//    return videos;

//     }catch(err){
//         console.log(err);
//     }
// }

// const getEmbedding=async(text)=>{
// try {
//      const ai = new GoogleGenAI({});
//      const res = await ai.models.embedContent({ model: 'gemini-embedding-001',contents: text });

//     const embedding =  res.embeddings[0].values;
//     return embedding;
//   } catch (err) {
//     console.error("Embedding error:", err.message);
//     return null;
//   }
// }


// const cosineSimilarity=(vecA,vecB)=>{
//  const dot=vecA.reduce((sum,a,i)=>sum+a*vecB[i],0);
//   const magA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
//   const magB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
//    if (magA === 0 || magB === 0) return 0;
//   return dot / (magA * magB);
// }
// const SemanticSearch=async(query)=>{
// const videos=await fetchyoutube(query,12);
//  if (!videos.length) {
//     console.log("No videos found.");
//     return;
//   }
//    const queryEmbedding = await getEmbedding(query);
//   if (!queryEmbedding) return;

//    for (let video of videos) {
//     const text = `${video.title}  , ${video.description}`;
//     const videoEmbedding = await getEmbedding(text);
//     if (!videoEmbedding) continue;
//     video.similarity = cosineSimilarity(queryEmbedding, videoEmbedding);
//   }
// videos.sort((a, b) => b.similarity - a.similarity);

//   return videos;
  
// }
// module.exports=YoutubeVideo




const { GoogleGenAI } = require("@google/genai");
const axios = require("axios");
const { Course_model } = require("../Database/Schema/user");
const YoutubeVideo = async (req, res) => {
  try {
    const { query } = req.body;
    const email = req.user.email;

    if (!query) {
      return res.status(400).json({ success: false, msg: "invalid query" });
    }

    const videos = await SemanticSearch(query);

    if (!videos || videos.length === 0) {
      return res.status(400).json({ success: false, msg: "no videos found" });
    }
    const course = new Course_model({
      email: email,
      topic: query,
      modules: videos, // storing video array
    });
    await course.save();
    console.log("Course saved");
    res.status(200).json({
      success: true,
      data: videos,
    });
  } catch (err) {
    console.log("ERROR:", err.message);
    res.status(500).json({ success: false, msg: "server error" });
  }
};



const fetchyoutube = async (query, maxResults) => {
  try {
    const { data } = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: query,
          type: "video",
          maxResults,
          key: process.env.YOUTUBE_API_KEY,
        },
      }
    );

    const videos = data.items.map((video) => ({
      id: video.id.videoId,
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnail: video.snippet.thumbnails.medium.url,
      url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
      similarity: 0,
    }));

    return videos;

  } catch (err) {
    console.log("YouTube API Error:", err.message);
    return [];
  }
};


const getEmbedding = async (text) => {
  try {
    const ai = new GoogleGenAI({});
    const res = await ai.models.embedContent({
      model: "gemini-embedding-001",
      contents: text,
    });

    return res.embeddings[0].values;

  } catch (err) {
    console.error("Embedding error:", err.message);
    return null;
  }
};


const cosineSimilarity = (vecA, vecB) => {
  const dot = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);

  const magA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));

  if (magA === 0 || magB === 0) return 0;

  return dot / (magA * magB);
};


const SemanticSearch = async (query) => {
  const videos = await fetchyoutube(query, 12);

  if (!videos || videos.length === 0) {
    console.log("No videos found.");
    return [];
  }

  const queryEmbedding = await getEmbedding(query);
  if (!queryEmbedding) return videos;

  for (let video of videos) {
    const text = `${video.title}, ${video.description}`;
    const videoEmbedding = await getEmbedding(text);

    if (!videoEmbedding) continue;

    video.similarity = cosineSimilarity(queryEmbedding, videoEmbedding);
  }

  videos.sort((a, b) => b.similarity - a.similarity);

  return videos;
};

module.exports = YoutubeVideo;