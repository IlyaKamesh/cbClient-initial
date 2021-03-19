import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import validator from '@/utils/validators';
import { IPet } from '@/pages/pet/types';
import { get } from 'lodash';
import { IBreed } from '@/pages/breed/types';
// import { DatePicker, Space } from 'antd';
// import moment from 'moment';

// const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

interface IProps {
  isLoading: boolean;
  onFinish: (values: any) => void;
  submitButtonText: string;
  initialValues?: IPet;
  breedList: IBreed[];
}

const PetForm = (props: IProps) => {
   const { Option } = Select;

  const isLoading = get(props, 'isLoading', false);


  return (
    <Form onFinish={props.onFinish} initialValues={props.initialValues} layout="vertical">
      <Form.Item name="name" label="Owner Full Name" rules={[validator.require]}>
        <Input />
      </Form.Item>

      <Form.Item name="email" label="Email">
        <Input />
      </Form.Item>

      <Form.Item name="phone" label="Phone">
        <Input />
      </Form.Item>

      <Form.Item name="petName" label="Pet Name" >
        <Input />
      </Form.Item>

      <Form.Item name="birthDate" label="Pet Birth Date" >
        <Input />
      </Form.Item>

      {/*<Space direction="vertical" size={12}>*/}
      {/*  /!*<DatePicker defaultValue={moment('01/01/2015', dateFormatList[0])} format={dateFormatList} />*!/*/}
      {/*</Space>*/}

      {/*<Form.Item name="description" label="Pet Description">*/}
      {/*  <Input />*/}
      {/*</Form.Item>*/}

      <Form.Item name="breed" label="Breed" >
        <Select>
          {props.breedList.map((el) => (
            <Option key={el._id} value={el._id}>
              {el.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          {props.submitButtonText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PetForm;
