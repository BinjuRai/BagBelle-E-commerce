import React from 'react';

const PasswordStrengthMeter = ({ password }) => {
  // Calculate password strength
  const calculateStrength = (pwd) => {
    if (!pwd) return { score: 0, label: '', color: '' };
    
    let score = 0;
    
    // Length check
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    
    // Character type checks
    if (/[a-z]/.test(pwd)) score++; // lowercase
    if (/[A-Z]/.test(pwd)) score++; // uppercase
    if (/[0-9]/.test(pwd)) score++; // numbers
    if (/[^A-Za-z0-9]/.test(pwd)) score++; // special chars
    
    // Complexity bonus
    const uniqueChars = new Set(pwd).size;
    if (uniqueChars > pwd.length * 0.7) score++;
    
    // Map score to strength level
    if (score <= 2) {
      return { score: 1, label: 'Weak', color: '#ef4444' };
    } else if (score <= 4) {
      return { score: 2, label: 'Fair', color: '#f59e0b' };
    } else if (score <= 5) {
      return { score: 3, label: 'Good', color: '#3b82f6' };
    } else {
      return { score: 4, label: 'Strong', color: '#10b981' };
    }
  };

  const strength = calculateStrength(password);
  
  if (!password) return null;

  return (
    <div style={{ marginTop: '8px' }}>
      {/* Strength Bar */}
      <div style={{
        width: '100%',
        height: '6px',
        backgroundColor: '#e5e7eb',
        borderRadius: '3px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${(strength.score / 4) * 100}%`,
          height: '100%',
          backgroundColor: strength.color,
          transition: 'all 0.3s ease'
        }} />
      </div>
      
      {/* Strength Label */}
      <div style={{
        marginTop: '4px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span style={{
          fontSize: '12px',
          fontWeight: '600',
          color: strength.color
        }}>
          Password Strength: {strength.label}
        </span>
        
        {/* Strength Icon */}
        {strength.score === 4 && <span>✅</span>}
        {strength.score === 3 && <span>👍</span>}
        {strength.score === 2 && <span>⚠️</span>}
        {strength.score === 1 && <span>❌</span>}
      </div>
      
      {/* Requirements Checklist */}
      <div style={{ marginTop: '8px', fontSize: '11px', color: '#6b7280' }}>
        <div style={{ display: 'grid', gap: '2px' }}>
          <div style={{ color: password.length >= 8 ? '#10b981' : '#9ca3af' }}>
            {password.length >= 8 ? '✓' : '○'} At least 8 characters
          </div>
          <div style={{ color: /[A-Z]/.test(password) ? '#10b981' : '#9ca3af' }}>
            {/[A-Z]/.test(password) ? '✓' : '○'} One uppercase letter
          </div>
          <div style={{ color: /[a-z]/.test(password) ? '#10b981' : '#9ca3af' }}>
            {/[a-z]/.test(password) ? '✓' : '○'} One lowercase letter
          </div>
          <div style={{ color: /[0-9]/.test(password) ? '#10b981' : '#9ca3af' }}>
            {/[0-9]/.test(password) ? '✓' : '○'} One number
          </div>
          <div style={{ color: /[^A-Za-z0-9]/.test(password) ? '#10b981' : '#9ca3af' }}>
            {/[^A-Za-z0-9]/.test(password) ? '✓' : '○'} One special character (!@#$%...)
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;