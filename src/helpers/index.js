
export const formatterCharactersToTable = (data)=>{
  return data?.length? data.map(el=>[el.id, el.name, el.image]): [];
}

export const formatterEpisodesToTable = (data)=>{
  return data?.length? data.map(el=>[el.id, el.name]): [];
}

export const isValidHttpUrl = (string) =>{
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

export const statusToColor = (status) =>{
  const opt = {
    'alive': 'green',
    'dead': 'danger',
    'unknown': 'gray',
  }
  return opt[status.toLowerCase()];
}
