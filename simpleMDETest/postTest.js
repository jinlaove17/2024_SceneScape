window.onload = function () {
  var title = document.getElementById("title");
  var content = document.getElementById("content");
  var submitButton = document.getElementById("submitButton");
  var titleSelect = document.getElementById("titleSelect");
  var attractionSelect = document.getElementById("attractionSelect");
  var postNo = null;
  var imageUrl;

  // 컨텐츠 제목 전체 받아와 select의 옵션에 추가
  fetch("http://localhost:8080/attraction/titles.do", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Populate titleSelect dropdown with received titles
      data.forEach((title) => {
        var option = document.createElement("option");
        option.value = title.trim(); // Trim any extra whitespace
        option.textContent = title.trim();
        titleSelect.appendChild(option);
      });
    })
    .catch((error) => console.error("Error fetching titles:", error));
  // 컨텐츠 제목 전체 받아와 select의 옵션에 추가

  // 사용자가 컨텐츠 제목을 선택하면 그 컨텐츠의 촬영지를 받아와 select 의 option에 추가
  titleSelect.addEventListener("change", function () {
    var selectedTitle = titleSelect.value;
    if (selectedTitle) {
      // Fetch attractions based on the selected title
      fetch(
        `http://localhost:8080/attraction/searchByTitle.do?title=${encodeURIComponent(
          selectedTitle
        )}`,
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((attractions) => {
          // Clear any existing options in attractionSelect
          attractionSelect.innerHTML = "";

          // Add the default option back
          var defaultOption = document.createElement("option");
          defaultOption.disabled = true;
          defaultOption.selected = true;
          defaultOption.textContent = "촬영지를 선택해 주세요.";
          attractionSelect.appendChild(defaultOption);

          console.log(attractions);

          // Populate attractionSelect dropdown with received attractions
          attractions.forEach((attraction) => {
            var option = document.createElement("option");
            option.value = attraction.no; // Assuming each attraction has a unique ID
            option.textContent = attraction.title; // Assuming each attraction has a name
            attractionSelect.appendChild(option);
          });
        })
        .catch((error) => console.error("Error fetching attractions:", error));
    }
  });
  // 사용자가 컨텐츠 제목을 선택하면 그 컨텐츠의 촬영지를 받아와 select 의 option에 추가

  // SimpleMDE 초기화
  var simplemde = new SimpleMDE({ element: content });

  // CodeMirror 객체 가져오기
  var codeMirror = simplemde.codemirror;

  // 커서 위치에 이미지 마크다운을 삽입하는 함수
  function insertImageMarkdown(url) {
    const doc = codeMirror.getDoc();
    const cursor = doc.getCursor(); // 현재 커서 위치 가져오기
    const markdownText = `\n![image description](${url})\n`;
    doc.replaceRange(markdownText, cursor); // 현재 커서 위치에 텍스트 삽입
  }

  // CodeMirror에 드래그 앤 드롭 이벤트 리스너 추가
  codeMirror.getWrapperElement().addEventListener("dragover", (event) => {
    event.preventDefault();
    codeMirror.getWrapperElement().style.backgroundColor = "#f0f0f0"; // 드래그 중일 때 스타일 변경
  });

  codeMirror.getWrapperElement().addEventListener("dragleave", () => {
    codeMirror.getWrapperElement().style.backgroundColor = ""; // 드래그 중지 시 스타일 원래대로
  });

  // SimpleMDE 에디터에 드래그 앤 드랍으로 이미지 첨부
  codeMirror.getWrapperElement().addEventListener("drop", async (event) => {
    try {
      event.preventDefault();
      codeMirror.getWrapperElement().style.backgroundColor = "";

      const file = event.dataTransfer.files[0];
      if (file) {
        if (postNo === null) {
          // 임시 게시글 번호 받아오기
          const tempPostResponse = await fetch("http://localhost:8080/board/createTempPost.do", {
            method: "POST",
            credentials: "include",
          });
          const tempPostData = await tempPostResponse.json();
          postNo = tempPostData.postNo;
          console.log("게시글 번호: ", postNo);
        }

        if (postNo !== null) {
          const formData = new FormData();
          formData.append("image", file);
          formData.append("postNo", postNo);

          const imageResponse = await fetch("http://localhost:8080/image/uploadImage.do", {
            method: "POST",
            body: formData,
          });

          const imageData = await imageResponse.json();
          imageUrl = imageData.url;
          insertImageMarkdown(imageUrl);
        }
      }
    } catch (error) {
      console.error("Error during file upload:", error);
    }
  });

  // 제출 버튼에 event handler 추가
  submitButton.addEventListener("click", async function (event) {
    event.preventDefault();

    var postTitle = title.value;
    var markdownContent = simplemde.value();
    var sceneTitle = titleSelect.value;
    var attractionNo = attractionSelect.value;

    // 이미지 개수 확인
    const imageCount = (markdownContent.match(/!\[image description]\(/g) || []).length;

    if (imageCount > 1) {
      alert("이미지는 한 장만 첨부할 수 있습니다.");
      return; // 제출 중단
    }

    console.log(postTitle);
    console.log(markdownContent);
    console.log(imageCount);
    console.log(postNo);
    console.log(imageUrl);

    fetch("http://localhost:8080/board/createScenePost.do", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: postTitle,
        content: markdownContent,
        postNo: postNo,
        imageUrl: imageUrl,
      }),
    })
      .then((response) => {
        if (response.ok) {
          postNo = null;
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        console.log("게시글 작성 성공:", data);
        // 게시글 작성 성공 후 boardTest.html로 이동
        window.location.href = "boardTest.html";
      })
      .catch((error) => {
        console.error("게시글 작성 실패:", error);
      });
  });
};
