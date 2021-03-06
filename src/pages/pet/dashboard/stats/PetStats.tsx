import React from 'react';
import { get, isEmpty } from 'lodash';
import { Col, Row, Statistic, Card } from 'antd';
import { IPetStats } from '@/pages/pet/types';

interface IProps {
  stats: IPetStats;
}

const PetStats = (props: IProps) => {
  const petStats = get(props, 'stats', '');

  // if (isEmpty(petStats)) return null;

  const totalCount = get(petStats, 'totalCount', '...');
  const totalCountDouble = get(petStats, 'totalCountDouble', '...');
  const totalCountTriple = get(petStats, 'totalCountTriple', '...');
  const totalCountTen = get(petStats, 'totalCountTen', '...');

  return (
    <Row gutter={16}>
      <Col span={6}>
        <Statistic title="Total" value={totalCount} />
      </Col>

      <Col span={6}>
        <Statistic title="Trend" value={totalCountDouble} />
      </Col>

      <Col span={6}>
        <Statistic title="Users" value={totalCountTriple} />
      </Col>

      <Col span={6}>
        <Statistic title="Hits" value={totalCountTen} />
      </Col>
    </Row>
  );
};

export default PetStats;
