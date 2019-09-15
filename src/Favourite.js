import React from "react";
import { Button } from "corfu";

function addFav({ year, title, poster, genres, id }) {
  const stor = window.localStorage;
  stor.setItem({ id }.id, JSON.stringify([year, title, poster, genres, id]));
}

function Favourite({ title, id, poster, genres, year }) {
  return (
    <div>
      <Button
        content="Add on my list"
        edges="rounded"
        primaryColor="primary"
        inverted={false}
        height="100px"
        onClick={() => {
          addFav({ title, id, poster, genres, year });
        }}
      />
    </div>
  );
}

export default Favourite;
