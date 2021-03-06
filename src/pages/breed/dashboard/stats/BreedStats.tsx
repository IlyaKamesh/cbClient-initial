import React from 'react';
import { get, isEmpty } from 'lodash';
import { Col, Row, Statistic, Card } from 'antd';
import { IBreedStats } from '@/pages/breed/types';

interface IProps {
  stats: IBreedStats;
}

const BreedStats = (props: IProps) => {
  const breedStats = get(props, 'stats', '');

  // if (isEmpty(breedStats)) return null;

  const totalCount = get(breedStats, 'totalCount', '...');
  const totalCountDouble = get(breedStats, 'totalCountDouble', '...');
  const totalCountTriple = get(breedStats, 'totalCountTriple', '...');
  const totalCountTen = get(breedStats, 'totalCountTen', '...');

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

export default BreedStats;
