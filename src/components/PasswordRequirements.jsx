'use client';

import { PASSWORD_REQUIREMENTS } from '@/schemas/authSchema';

export default function PasswordRequirements({ password }) {
  return (
    <ul aria-label="Requisitos de senha" style={styles.list}>
      {PASSWORD_REQUIREMENTS.map(({ key, label, test }) => {
        const met = test(password);

        return (
          <li key={key} style={{ ...styles.item, color: met ? '#15803d' : '#64748b' }}>
            <span aria-hidden="true">{met ? '✓' : '○'}</span>
            <span>{label}</span>
          </li>
        );
      })}
    </ul>
  );
}

const styles = {
  list: {
    display: 'grid',
    gap: '4px',
    listStyle: 'none',
    padding: 0,
    margin: '2px 0 0',
    fontSize: '12px',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'color 0.2s ease',
  },
};
