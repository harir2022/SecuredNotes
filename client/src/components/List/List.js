import React from 'react';

// Custom Components
import Note from '../Note/Note';

const List = (props) => {
  // Destructuring props
  const { notesList, list } = props;
// console.log(notesList)
  return (
    <div className='row'>
      {notesList.map((data, index) => (
        <Note
          key={index}
          title={data.content.title}
          note={data.content.note}
          pin={data.content.pin}
          id={data.content.id}
          archiev={data.content.archieve}
          listname={list || "delete"}
          bgColor={data.content.bgColor}
          checkList={data.content.checklist}
          lastupdated={data.time}
        />
      ))}
    </div>
  );
};

export default List;
