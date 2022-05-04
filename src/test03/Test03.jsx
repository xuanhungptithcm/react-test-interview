/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ImgBlank from "../assets/images/img-blank.svg";

const cards = Array.from(Array(100).keys()).map((item) => ({
  title: `Card title ${item + 1}`,
  lead: `Some quick example text to build on the card title and make up the bulk of the card's content.`,
}));

function Test03() {
  // code something here ...
  const [listCard, setListCard] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [limit] = useState(10);
  const lastElementRef = useRef();

  const getListCard = useCallback(async () => {
    setLoading((loading) => !loading);
    await new Promise((resolve) => {
      const newCardItems = cards.slice(page * limit, page * limit + 10);
      setListCard((oldCard) => [...oldCard, ...newCardItems]);
      setTimeout(() => {
        resolve();
      }, 0);
    });
    setLoading((loading) => !loading);
  }, [limit, page]);

  const isBrowserSupportIntersection = useMemo(() => {
    return (
      "IntersectionObserver" in window ||
      "IntersectionObserverEntry" in window ||
      "intersectionRatio" in window.IntersectionObserverEntry.prototype
    );
  }, []);

  const lastElement = useCallback(
    (el) => {
      if (!el || !isBrowserSupportIntersection) return;
      if (lastElementRef.current) lastElementRef.current.disconnect();
      lastElementRef.current = el;

      // if(lastElementRef.current) lastElementRef.current.disconnect();
      lastElementRef.current = new IntersectionObserver(
        (entries) => {
          console.log(entries);
          if (!entries.length || loading) return;
          if (entries[0].isIntersecting) {
            setPage((page) => page + 1);
          }
        },
        {
          rootMargin: "0px 0px 0px 0px",
          threshold: [0, 0.25, 0.5, 0.75, 1],
        }
      );
      lastElementRef.current.observe(el);
    },
    [isBrowserSupportIntersection, loading]
  );

  useEffect(() => {
    getListCard();
  }, [page]);

  return (
    <div>
      <h2>Test03: Infinite scroll with FE</h2>

      <div className="test03_content">
        {listCard.map((item, index) => (
          <div
            key={item.title + index}
            className="card"
            style={{ width: "18rem" }}
            ref={index === listCard.length - 1 ? lastElement : null}
          >
            <img className="card-img-top" src={ImgBlank} alt="card" />
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <p className="card-text">{item.lead}</p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "30px 0",
          }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Test03;
