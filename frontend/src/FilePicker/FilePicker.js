import APP_STATUS from "@/app_status";

export default function FilePicker({ updateStatus, updateFileContents }) {
  function handleFileLoading(file) {
    let fileReader = new FileReader();
    fileReader.onloadend = () => handleFileReading(fileReader);
    fileReader.readAsText(file);
  }

  function handleFileReading(reader) {
    let content = reader.result;

    content = content.split("\n");
    content.pop();

    content = content.map((row) => row.split(","));

    updateStatus(APP_STATUS.READING_FILE);
    processFile(content);
  }

  function processFile(fileContent) {
    const fileObj = {};

    console.log(fileContent);

    try {
      fileContent.forEach((row, index) => {
        if (index === 0) return;

        if (
          row.length != 2 ||
          !isNumeric(row[0]) ||
          !isNumeric(row[1]) ||
          parseFloat(row[1]) < 0
        ) {
          throw new Error("Invalid file");
        }

        const code = row[0];
        const new_price = row[1];

        fileObj[code] = parseFloat(new_price);
      });

      updateFileContents(fileObj);
      updateStatus(APP_STATUS.FILE_READY);
    } catch (error) {
      updateStatus(APP_STATUS.FILE_ERROR);
    }
  }

  return (
    <div>
      <input
        type="file"
        accept=".csv"
        onChange={(event) => handleFileLoading(event.target.files[0])}
      />
    </div>
  );
}

function isNumeric(str) {
  if (typeof str != "string") return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
}
