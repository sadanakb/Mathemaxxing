'use client';

import type { VisualConfig } from '@/lib/curriculum/types';
import { GeometricShape } from '@/components/visualizations/GeometricShape';
import { FractionCircle } from '@/components/visualizations/FractionCircle';
import { FractionBar } from '@/components/visualizations/FractionBar';
import { Base10Blocks } from '@/components/visualizations/Base10Blocks';
import { CoinsSVG } from '@/components/visualizations/CoinsSVG';
import { RulerSVG } from '@/components/visualizations/RulerSVG';
import { ScaleSVG } from '@/components/visualizations/ScaleSVG';
import { ThermometerSVG } from '@/components/visualizations/ThermometerSVG';
import { PieChartSVG } from '@/components/visualizations/PieChartSVG';
import { TallyChart } from '@/components/visualizations/TallyChart';
import { DiceVisual } from '@/components/visualizations/DiceVisual';
import { Protractor } from '@/components/visualizations/Protractor';
import { Cuboid3D } from '@/components/visualizations/Cuboid3D';

type ExerciseVisualProps = {
  config: VisualConfig;
};

export function ExerciseVisual({ config }: ExerciseVisualProps) {
  const { type, props } = config;

  return (
    <div className="my-4 flex justify-center">
      {type === 'geometric-shape' && <GeometricShape {...(props as React.ComponentProps<typeof GeometricShape>)} />}
      {type === 'fraction-circle' && <FractionCircle {...(props as React.ComponentProps<typeof FractionCircle>)} />}
      {type === 'fraction-bar' && <FractionBar {...(props as React.ComponentProps<typeof FractionBar>)} />}
      {type === 'base10-blocks' && <Base10Blocks {...(props as React.ComponentProps<typeof Base10Blocks>)} />}
      {type === 'coins' && <CoinsSVG {...(props as React.ComponentProps<typeof CoinsSVG>)} />}
      {type === 'ruler' && <RulerSVG {...(props as React.ComponentProps<typeof RulerSVG>)} />}
      {type === 'scale' && <ScaleSVG {...(props as React.ComponentProps<typeof ScaleSVG>)} />}
      {type === 'thermometer' && <ThermometerSVG {...(props as React.ComponentProps<typeof ThermometerSVG>)} />}
      {type === 'pie-chart' && <PieChartSVG {...(props as React.ComponentProps<typeof PieChartSVG>)} />}
      {type === 'tally' && <TallyChart {...(props as React.ComponentProps<typeof TallyChart>)} />}
      {type === 'dice' && <DiceVisual {...(props as React.ComponentProps<typeof DiceVisual>)} />}
      {type === 'protractor' && <Protractor {...(props as React.ComponentProps<typeof Protractor>)} />}
      {type === 'cuboid-3d' && <Cuboid3D {...(props as React.ComponentProps<typeof Cuboid3D>)} />}
    </div>
  );
}
