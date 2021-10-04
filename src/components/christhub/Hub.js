import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import db from "../../Auth/Firbase";
import "./Hub.css";
function Hub() {
  const [filter, setFilter] = useState([]);

  const loadOptions = async (inputValue) => {
    inputValue = inputValue.toLowerCase().replace(/\W/g, "");
    return new Promise((resolve) => {
      db.collection("posts")
        .orderBy("username")
        .startAt(inputValue)
        .endAt(inputValue + "\uf8ff")
        .get()
        .then((docs) => {
          if (!docs.empty) {
            let recommendedTags = [];
            docs.forEach(function (doc) {
              const tag = {
                value: doc.id,
                label: doc.data().username,
              };
              recommendedTags.push(tag);
            });
            return resolve(recommendedTags);
          } else {
            return resolve([]);
          }
        });
    });
  };
  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      width: state.selectProps.width,
      color: state.selectProps.menuColor,
      padding: 10,
    }),

    control: (_, { selectProps: { width } }) => ({
      width: width,
    }),

    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };
  return (
    <>
      <AsyncSelect
        styles={customStyles}
        loadOptions={loadOptions}
        onChange={(e) => setFilter(e.target.value)}
        width="500px"
        className="dropMenu"
      />

      {filter.map((e) => (
        <h1>{e.data.username}</h1>
      ))}
    </>
  );
}

export default Hub;
