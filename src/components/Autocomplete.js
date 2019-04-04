import React, { useState, useRef, useEffect, Fragment } from "react";

export default function Autocomplete(props) {
  const { suggestionsArray } = props;

  const resultContainer = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [isMatch, setIsMatch] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [count, setCount] = useState(0);

  const handleOnChange = e => {
    const textValue = e.target.value;
    setInputValue(textValue);
  };

  const handleKeyUp = e => {
    const textValue = e.target.value;
    const matchList = [];
    setIsMatch(false);
    setSuggestions([]);

    if (textValue.length > 0) {
      setInputValue(textValue);

      for (let i = 0; i < suggestionsArray.length; i++) {
        if (
          suggestionsArray[i].toLowerCase().indexOf(textValue.toLowerCase()) ===
          0
        ) {
          matchList.push(suggestionsArray[i]);
        }
      }

      if (matchList.length === 0) return;
      else {
        setIsMatch(true);
        setSuggestions(matchList);
      }

      if (isMatch) {
        const { keyCode } = e;
        setCount(0);
        switch (keyCode) {
          case 13:
            setInputValue(resultContainer.current.children[count].textContent);
            setIsMatch(false);
            break;

          case 40:
            if (count < matchList.length - 1) setCount(count + 1);
            break;

          case 38:
            if (count > 0) setCount(count - 1);
            break;

          case 27:
            setIsMatch(false);
            break;

          default:
            break;
        }
      }
    }
  };

  const handleKeyDown = e => {
    const { keyCode } = e;

    if (keyCode === 13) {
      e.preventDefault();
    }
  };

  const handleClick = value => {
    setInputValue(value);
    setIsMatch(false);
  };

  const displayMatches = matchList => {
    return matchList.map((item, key) => {
      const regex = new RegExp(inputValue, "gi");
      const suggest = item.replace(regex, `<b>${inputValue}</b>`);
      return (
        <li
          key={key}
          className="list-group-item"
          role="option"
          aria-selected="false"
          onClick={() => handleClick(item)}
        >
          <span dangerouslySetInnerHTML={{ __html: suggest }} />
        </li>
      );
    });
  };

  useEffect(
    () => {
      const resultList = resultContainer.current.children;
      const resultListLength = resultList.length;

      if (isMatch && resultListLength > 0) {
        for (let i = 0; i < resultListLength; i++) {
          resultList[i].classList.remove("active");
        }
        resultList[count].classList.add("active");
      }
    },
    [isMatch, count]
  );

  return (
    <Fragment>
      <input
        className="form-control search"
        type="text"
        autoComplete="off"
        placeholder="Search or select a country..."
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
        onChange={handleOnChange}
        value={inputValue}
      />

      <ul
        className="list-group suggestions"
        id="suggestions"
        ref={resultContainer}
        role="listbox"
      >
        {isMatch ? displayMatches(suggestions) : null}
      </ul>
    </Fragment>
  );
}
