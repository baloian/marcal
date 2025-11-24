import { MarCal } from '../marcal';
import { NYSEMarket } from '../nyse';

// Mock NYSEMarket
jest.mock('../nyse', () => {
  return {
    NYSEMarket: jest.fn().mockImplementation(() => ({
      open: jest.fn(),
      preMarket: jest.fn(),
      afterMarket: jest.fn(),
      minutesToClose: jest.fn()
    }))
  };
});

describe('MarCal', () => {
  let marCal: MarCal;
  let mockNYSE: jest.Mocked<NYSEMarket>;

  beforeEach(() => {
    jest.clearAllMocks();
    marCal = new MarCal();
    mockNYSE = marCal.nyse as jest.Mocked<NYSEMarket>;
  });

  describe('marketOpen', () => {
    it('should return true when market is open', () => {
      mockNYSE.open.mockReturnValue(true);
      expect(marCal.marketOpen()).toBe(true);
      expect(mockNYSE.open).toHaveBeenCalledTimes(1);
    });

    it('should return false when market is closed', () => {
      mockNYSE.open.mockReturnValue(false);
      expect(marCal.marketOpen()).toBe(false);
      expect(mockNYSE.open).toHaveBeenCalledTimes(1);
    });
  });

  describe('preMarket', () => {
    it('should return true during pre-market hours', () => {
      mockNYSE.preMarket.mockReturnValue(true);
      expect(marCal.preMarket()).toBe(true);
      expect(mockNYSE.preMarket).toHaveBeenCalledTimes(1);
    });

    it('should return false outside pre-market hours', () => {
      mockNYSE.preMarket.mockReturnValue(false);
      expect(marCal.preMarket()).toBe(false);
      expect(mockNYSE.preMarket).toHaveBeenCalledTimes(1);
    });
  });

  describe('afterMarket', () => {
    it('should return true during after-market hours', () => {
      mockNYSE.afterMarket.mockReturnValue(true);
      expect(marCal.afterMarket()).toBe(true);
      expect(mockNYSE.afterMarket).toHaveBeenCalledTimes(1);
    });

    it('should return false outside after-market hours', () => {
      mockNYSE.afterMarket.mockReturnValue(false);
      expect(marCal.afterMarket()).toBe(false);
      expect(mockNYSE.afterMarket).toHaveBeenCalledTimes(1);
    });
  });

  describe('minutesToClose', () => {
    it('should return the correct number of minutes until market close', () => {
      mockNYSE.minutesToClose.mockReturnValue(120);
      expect(marCal.minutesToClose()).toBe(120);
      expect(mockNYSE.minutesToClose).toHaveBeenCalledTimes(1);
    });
  });
});
