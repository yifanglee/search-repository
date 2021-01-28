import React, { useContext } from 'react';
import { SearchContext } from '../Contexts/SearchContext';
import { useThrottleCallback } from '@react-hook/throttle';

import is from 'is_js';

const ReopList = (Props) => {
  const { totoal, items, keyword, loading, notFound, searchReop } = useContext(
    SearchContext
  );
  const handleScroll = async () => {
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
      if (keyword === '') return;
      await searchReop(keyword, 0);
    }
  };
  window.addEventListener('scroll', useThrottleCallback(handleScroll, 5, true));
  if (is.empty(items) && keyword === '' && !notFound) return null;
  return (
    <div className="reop-list">
      <p className="font-bold my-3">{totoal} repository results</p>
      <ul className="repositories">
        {items.map((item, key) => {
          return (
            <li key={key} className="repository my-3 pb-3 border-b flex">
              <div className="mr-2 text-sm pt-1">
                <i className="baltic-sea fas fa-book"></i>
              </div>
              <div>
                <a href={item.url} className="blue">
                  {item.full_name}
                </a>
                <p className="text-sm my-1">{item.description}</p>
                <div className="baltic-sea text-sm">
                  {is.not.null(item.language) && (
                    <span className="inline-block mr-5">{item.language}</span>
                  )}
                  {is.not.null(item.license) && (
                    <span className="inline-block mr-5">
                      {item.license.name}
                    </span>
                  )}
                  <span className="inline-block mr-5">
                    watch: {item.watchers_count}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      {loading && (
        <div className="text-center">
          <i className="fas fa-spinner text-2xl"></i>
        </div>
      )}
    </div>
  );
};

export default ReopList;
