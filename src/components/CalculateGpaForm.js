import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
  Space,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import CalculationService from "../services/CalculationService";

const CalculateGpaForm = () => {
  const [form] = Form.useForm();

  const [departments, setDepartments] = useState(null);
  const [lectures, setLectures] = useState(null);
  const [notes, setNotes] = useState(null);
  const [gpa, setGpa] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onFinish = (value) => {
    form
      .validateFields()
      .then((values) => {
        console.log(value);
        if (value.lectureNoteList == null) {
          message.error("Lütfen ders ekleyiniz");
        } else {
          const fetchData = async () => {
            try {
              const response = await CalculationService.calculateGpa(value);
              setGpa(response.data);
            } catch (error) {
              console.log(error);
            }
          };
          fetchData();
          setIsModalOpen(true);
        }
      })
      .catch((errorInfo) => {
        setIsModalOpen(false);
      });
  };

  const onChangeDepartment = (value) => {
    const fetchData = async () => {
      try {
        const response = await CalculationService.getLectures(value);
        const options = response.data.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        setLectures(options);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  };

  const onSearch = (value) => {
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CalculationService.getDepartments();
        const options = response.data.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        setDepartments(options);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchNotes = async () => {
      try {
        const response = await CalculationService.getNotes();
        const options = response.data.map((item) => ({
          value: item,
          label: item,
        }));
        setNotes(options);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    fetchNotes();
  }, []);

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item
        label="Not Ortalamanız"
        name="currentGPA"
        rules={[
          {
            required: true,
            message: "Not ortalaması giriniz",
          },
        ]}
      >
        <InputNumber
          placeholder="Lütfen not ortalamanızı giriniz"
          style={{ width: "100%" }}
          min={0}
          max={4}
        />
      </Form.Item>
      <Form.Item
        label="Toplam Alınan Kredi"
        name="totalCredit"
        rules={[
          {
            required: true,
            message: "Aldığınız toplam kredi sayısını giriniz",
          },
        ]}
      >
        <InputNumber
          placeholder="Şu ana kadar aldığınız toplam kredi sayısını giriniz"
          style={{ width: "100%" }}
          min={0}
        />
      </Form.Item>
      <Form.Item label="Bölümünüzü Giriniz">
        <Select
          showSearch
          placeholder="Lütfen bölümünüzü giriniz"
          optionFilterProp="children"
          onChange={onChangeDepartment}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={departments}
        />
      </Form.Item>
      <Form.Item>
        <Form.List name="lectureNoteList">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: "flex",
                    marginBottom: 8,
                  }}
                  align="middle"
                >
                  <Form.Item
                    {...restField}
                    rules={[
                      {
                        required: true,
                        message: "Ders seçiniz",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      placeholder="Ders"
                      optionFilterProp="children"
                      dropdownMatchSelectWidth={false}
                      onChange={onChange}
                      onSearch={onSearch}
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={lectures}
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "credit"]}
                    rules={[
                      {
                        required: true,
                        message: "Kredi notu giriniz",
                      },
                    ]}
                  >
                    <InputNumber placeholder="Kredi" min={0} max={12} />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "note"]}
                    rules={[
                      {
                        required: true,
                        message: "Ders seçiniz",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      placeholder="Ders Notu"
                      optionFilterProp="children"
                      onChange={onChange}
                      onSearch={onSearch}
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={notes}
                    />
                  </Form.Item>

                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Ders Ekleyin
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          type="primary"
          className="bg-blue-600 float-right"
        >
          Hesapla
        </Button>
        <Modal
          title="Not Ortalamanız"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleOk}
          footer={[]}
        >
          <div className="font-semibold text-4xl"> {gpa}</div>
        </Modal>
      </Form.Item>
    </Form>
  );
};

export default CalculateGpaForm;
