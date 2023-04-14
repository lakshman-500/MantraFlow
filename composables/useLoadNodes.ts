export const useLoadNodes = (file: String) => {
  let nodes = {};
  nodes = JSON.parse(file.toString());
  return {
    nodes,
  };
};
