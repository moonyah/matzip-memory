import { useState } from "react";
import "./App.css";

function App() {
  const [showSaved, setShowSaved] = useState(false);
  const [savedPlaces, setSavedPlaces] = useState<any[]>([]);

  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    const res = await fetch(`/api/search?query=${encodeURIComponent(keyword)}`);
    const data = await res.json();
    setResults(data.results || []);
  };

  const handleSave = (place: any) => {
    const saved = JSON.parse(localStorage.getItem("savedPlaces") || "[]");
    const exists = saved.some((p: any) => p.place_id === place.place_id);
    if (!exists) {
      saved.push(place);
      localStorage.setItem("savedPlaces", JSON.stringify(saved));
      alert("저장 완료!");
    } else {
      alert("이미 저장된 장소예요!");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>맛집기억소</h1>
      <button
        onClick={() => {
          const saved = JSON.parse(localStorage.getItem("savedPlaces") || "[]");
          setSavedPlaces(saved);
          setShowSaved(true);
        }}
      >
        내 리스트 보기
      </button>

      {showSaved && (
        <div>
          <h2>내가 저장한 장소들</h2>
          <ul>
            {savedPlaces.map((place, idx) => (
              <li key={idx} style={{ marginTop: "1rem" }}>
                <strong>{place.name}</strong>
                <div>{place.formatted_address}</div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="장소 키워드 입력 (예: 파스타)"
        style={{ padding: "0.5rem", width: "300px" }}
      />
      <button onClick={handleSearch} style={{ marginLeft: "0.5rem" }}>
        검색
      </button>

      <ul>
        {results.map((place, idx) => (
          <li key={idx} style={{ marginTop: "1rem" }}>
            <strong>{place.name}</strong>
            <div>{place.formatted_address}</div>
            <button
              onClick={() => handleSave(place)}
              style={{ marginTop: "0.5rem" }}
            >
              ♥ 저장
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
