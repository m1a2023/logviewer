import React, { ChangeEvent } from 'react';

interface SearchBarProps {
    setSearchQuery: (query: string) => void;
    placeholder?: string;
    className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
                                                 setSearchQuery,
                                                 placeholder = 'Поиск...',
                                                 className = '',
                                             }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className={`input-group ${className}`}>
            <input
                type="text"
                className="form-control"
                placeholder={placeholder}
                onChange={handleChange}
                aria-label="Поиск"
            />
        </div>
    );
};
