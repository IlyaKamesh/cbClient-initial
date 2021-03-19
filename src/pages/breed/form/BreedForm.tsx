import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import validator from '@/utils/validators';
import { IBreed } from '@/pages/breed/types';
import { get } from 'lodash';
import { IPet } from '@/pages/pet/types';

interface IProps {
  isLoading: boolean;
  onFinish: (values: any) => void;
  submitButtonText: string;
  initialValues?: IBreed;
  petList: IPet[]
}

const BreedForm = (props: IProps) => {
   const { Option } = Select;

  const isLoading = get(props, 'isLoading', false);

  // rules={[validator.require]}

  return (
    <Form onFinish={props.onFinish} initialValues={props.initialValues} layout="vertical">
      <Form.Item name="name" label="Breed name" >
        <Input  />
      </Form.Item>

      <Form.Item name="pet"  label="Pet" >
        <Select>
          {props.petList.map((el) => (
            <Option key={el._id} value={el._id}>
              {el.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="color" label="Color" >
        <Input  />
      </Form.Item>

      <Form.Item name="gender" label="Gender">
        <Input  />
      </Form.Item>

      <Form.Item name="description" label="Breed Description">
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          {props.submitButtonText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BreedForm;
