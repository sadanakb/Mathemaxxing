'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
import { ItemPreview } from './ItemPreview';
import { RARITY_COLORS, RARITY_LABELS, type ShopItem } from '@/lib/gamification/shop-items';

type ShopItemCardProps = {
  item: ShopItem;
  owned: boolean;
  equipped: boolean;
  canBuy: boolean;
  onPurchase: () => void;
  onEquip: () => void;
};

export function ShopItemCard({
  item,
  owned,
  equipped,
  canBuy,
  onPurchase,
  onEquip,
}: ShopItemCardProps) {
  const rarityStyle = RARITY_COLORS[item.rarity];

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={[
        'rounded-[var(--card-radius)] border-2 overflow-hidden transition-all duration-200',
        equipped
          ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 shadow-md'
          : owned
            ? 'border-emerald-200 bg-white'
            : 'border-gray-100 bg-white hover:shadow-md',
      ].join(' ')}
    >
      {/* Preview area */}
      <div className="relative flex items-center justify-center py-4 bg-gray-50/50">
        <ItemPreview
          category={item.category}
          svgPreview={item.svgPreview}
          icon={item.icon}
          size={72}
        />
        {/* Rarity badge */}
        <span className={[
          'absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full',
          rarityStyle.bg, rarityStyle.text,
        ].join(' ')}>
          {RARITY_LABELS[item.rarity]}
        </span>
        {equipped && (
          <span className="absolute top-2 left-2 bg-[var(--color-primary)] text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <Icon name="check" size={10} /> Aktiv
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-3 space-y-2">
        <h3 className="text-sm font-bold text-gray-800 font-[family-name:var(--font-heading)]">
          {item.name}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>

        {/* Action */}
        {owned && !item.consumable ? (
          <button
            onClick={onEquip}
            className={[
              'w-full py-2 text-xs font-bold rounded-xl transition-all duration-150',
              equipped
                ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                : 'bg-[var(--color-primary)] text-white shadow-[0_2px_0_var(--color-primary-dark)] active:translate-y-[1px] active:shadow-none',
            ].join(' ')}
          >
            {equipped ? 'Ablegen' : 'Anziehen'}
          </button>
        ) : (
          <button
            onClick={onPurchase}
            disabled={!canBuy}
            className={[
              'w-full py-2 text-xs font-bold rounded-xl transition-all duration-150 flex items-center justify-center gap-1.5',
              canBuy
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-white shadow-[0_2px_0_#d97706] active:translate-y-[1px] active:shadow-none'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed',
            ].join(' ')}
          >
            <Icon name="coin" size={14} />
            {item.cost}
          </button>
        )}
      </div>
    </motion.div>
  );
}
