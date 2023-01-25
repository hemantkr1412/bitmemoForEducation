import { useState, useEffect } from "react";

const CertDataExcel = (props) => {
  const { certNumber, certData } = props;
  const [serials, setSerials] = useState([]);

  useEffect(() => {
    let myserials = [];
    for (let i = 0; i < parseInt(certNumber); i++) {
      myserials.push(i);
    }
    setSerials(myserials);
  }, [props]);

  return (
    <table className="exceltable">
      <tbody>
        <tr>
          <td style={{ width: "5px" }}>S.No.</td>
          {certData["variable1"] !== "" && <td>{certData["variable1"]}</td>}
          {certData["variable2"] !== "" && <td>{certData["variable2"]}</td>}
          <td style={{ width: "150px" }}>Recipient Address</td>
          <td style={{ width: "150px" }}>Email</td>
        </tr>
        {serials.map((sno) => {
          return (
            <tr key={"certExcelInput-" + (sno + 1)}>
              <td style={{ width: "5px" }}>{sno + 1}</td>
              {certData["variable1"] !== "" && (
                <td>
                  <textarea
                    id={
                      "certExcelInput-" +
                      certData["variable1"] +
                      "-" +
                      (sno + 1)
                    }
                    onChange={(e) => {
                      let data = e.target.value;
                      let rowData = data.split("\n");
                      rowData.forEach((row, rowIndex) => {
                        let columnData = row.split("\t");

                        let cell1Id =
                          "certExcelInput-" +
                          certData["variable1"] +
                          "-" +
                          (rowIndex + sno + 1);

                        let cell2Id =
                          certData["variable2"] !== ""
                            ? "certExcelInput-" +
                              certData["variable2"] +
                              "-" +
                              (rowIndex + sno + 1)
                            : "certExcelInput-address-" + (rowIndex + sno + 1);

                        let cell3Id =
                          "certExcelInput-address-" + (rowIndex + sno + 1);
                        let cell4Id =
                          "certExcelInput-email-" + (rowIndex + sno + 1);

                        let cell1 = document.getElementById(cell1Id);
                        let cell2 = document.getElementById(cell2Id);
                        let cell3 = document.getElementById(cell3Id);
                        let cell4 = document.getElementById(cell4Id);

                        if (columnData[0]) cell1.value = columnData[0];
                        if (columnData[1]) cell2.value = columnData[1];
                        if (columnData[2]) cell3.value = columnData[2];
                        if (columnData[3]) cell4.value = columnData[3];
                      });
                    }}
                  />
                </td>
              )}
              {certData["variable2"] !== "" && (
                <td>
                  <textarea
                    id={
                      "certExcelInput-" +
                      certData["variable2"] +
                      "-" +
                      (sno + 1)
                    }
                    onChange={(e) => {
                      let data = e.target.value;
                      let rowData = data.split("\n");
                      rowData.forEach((row, rowIndex) => {
                        let columnData = row.split("\t");

                        let cell1Id =
                          "certExcelInput-" +
                          certData["variable2"] +
                          "-" +
                          (rowIndex + sno + 1);

                        let cell2Id =
                          "certExcelInput-address-" + (rowIndex + sno + 1);
                        let cell3Id =
                          "certExcelInput-email-" + (rowIndex + sno + 1);

                        let cell1 = document.getElementById(cell1Id);
                        let cell2 = document.getElementById(cell2Id);
                        let cell3 = document.getElementById(cell3Id);

                        if (columnData[0]) cell1.value = columnData[0];
                        if (columnData[1]) cell2.value = columnData[1];
                        if (columnData[2]) cell3.value = columnData[2];
                      });
                    }}
                  />
                </td>
              )}
              <td>
                <textarea
                  id={"certExcelInput-address-" + (sno + 1)}
                  onChange={(e) => {
                    let data = e.target.value;
                    let rowData = data.split("\n");
                    rowData.forEach((row, rowIndex) => {
                      let columnData = row.split("\t");

                      let cell1Id =
                        "certExcelInput-address-" + (rowIndex + sno + 1);
                      let cell2Id =
                        "certExcelInput-email-" + (rowIndex + sno + 1);

                      let cell1 = document.getElementById(cell1Id);
                      let cell2 = document.getElementById(cell2Id);

                      if (columnData[0]) cell1.value = columnData[0];
                      if (columnData[1]) cell2.value = columnData[1];
                    });
                  }}
                />
              </td>
              <td>
                <textarea
                  id={"certExcelInput-email-" + (sno + 1)}
                  onChange={(e) => {
                    let data = e.target.value;
                    let rowData = data.split("\n");
                    rowData.forEach((row, rowIndex) => {
                      let columnData = row.split("\t");

                      let cell1Id =
                        "certExcelInput-email-" + (rowIndex + sno + 1);

                      let cell1 = document.getElementById(cell1Id);

                      if (columnData[0]) cell1.value = columnData[0];
                    });
                  }}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CertDataExcel;
